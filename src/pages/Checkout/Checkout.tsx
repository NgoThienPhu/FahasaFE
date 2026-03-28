import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FiChevronRight,
    FiMapPin,
    FiCreditCard,
    FiPackage,
    FiShoppingBag,
    FiCheckCircle,
} from "react-icons/fi";
import styles from "./Checkout.module.css";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import bookApi from "../../services/apis/bookApi";
import orderApi from "../../services/apis/orderApi";
import type { CreateOrderData } from "../../services/apis/orderApi";
import userApi from "../../services/apis/userApi";
import type { APIResponseError } from "../../services/apis/config";
import type { Book } from "../../services/entities/Book";
import type { CreateAddressRequestDTO } from "../../services/apis/userApi";
import LazyImage from "../../components/lazy_image/LazyImage";
import { BookPlaceholderIcon } from "../../components/icons/BookPlaceholderIcon";
import Loading from "../../components/Loading/Loading";

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", { style: "decimal", minimumFractionDigits: 0 }).format(price) + " ₫";
}

function getBookPrice(book: Book): number {
    return typeof (book as unknown as { price?: number }).price === "number"
        ? (book as unknown as { price: number }).price
        : book.price?.price ?? 0;
}

type SavedAddress = {
    id: string;
    fullName: string;
    phoneNumber: string;
    addressDetail: string;
    city: string;
    district: string;
    ward: string;
    isDefault?: boolean;
};

const FREE_SHIP_THRESHOLD = 300_000;
const SHIPPING_FLAT = 30_000;

const emptyForm: CreateAddressRequestDTO = {
    fullName: "",
    phoneNumber: "",
    addressDetail: "",
    city: "",
    district: "",
    ward: "",
    isDefault: false,
};

function pickOrderCodeFromResponse(data: CreateOrderData | undefined): string {
    if (!data || typeof data !== "object") return "";
    if (typeof data.orderCode === "string" && data.orderCode.trim()) return data.orderCode.trim();
    if (typeof data.code === "string" && data.code.trim()) return data.code.trim();
    if (data.id != null && String(data.id).trim()) return String(data.id).trim();
    return "";
}

function getCheckoutErrorMessage(err: unknown): string {
    if (err && typeof err === "object") {
        const e = err as Partial<APIResponseError> & { message?: string };
        if (typeof e.message === "string" && e.message.trim()) return e.message.trim();
        if (typeof e.error === "string" && e.error.trim()) return e.error.trim();
    }
    return "Đặt hàng thất bại. Vui lòng thử lại.";
}

const CREATE_ORDER_PHONE_REGEX =
    /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-5]|9[0-9])\d{7}$/;

function normalizePhoneForOrder(phone: string): string {
    let p = phone.trim().replace(/\s/g, "");
    if (p.startsWith("+84")) p = `0${p.slice(3)}`;
    return p;
}

type AddressFieldKey =
    | "fullName"
    | "phoneNumber"
    | "addressDetail"
    | "city"
    | "district"
    | "ward";

function validateAddressFields(f: CreateAddressRequestDTO): Partial<Record<AddressFieldKey, string>> {
    const errors: Partial<Record<AddressFieldKey, string>> = {};
    const fullName = f.fullName.trim();
    const rawPhone = f.phoneNumber.trim().replace(/\s/g, "");
    const addressDetail = f.addressDetail.trim();
    const city = f.city.trim();
    const district = f.district.trim();
    const ward = f.ward.trim();

    if (!fullName) errors.fullName = "Tên khách hàng không được để trống";
    else if (fullName.length < 2) errors.fullName = "Tên khách hàng phải từ 2 ký tự";

    if (!rawPhone) errors.phoneNumber = "Số điện thoại không được để trống";
    else {
        const phoneForPattern = rawPhone.startsWith("+84") ? rawPhone : normalizePhoneForOrder(rawPhone);
        if (!CREATE_ORDER_PHONE_REGEX.test(phoneForPattern)) {
            errors.phoneNumber = "Số điện thoại không hợp lệ";
        }
    }

    if (!addressDetail) errors.addressDetail = "Địa chỉ chi tiết không được để trống";
    if (!city) errors.city = "Thành phố không được để trống";
    if (!district) errors.district = "Quận/huyện không được để trống";
    if (!ward) errors.ward = "Phường/xã không được để trống";
    return errors;
}

const API_FIELD_KEYS: AddressFieldKey[] = [
    "fullName",
    "phoneNumber",
    "addressDetail",
    "city",
    "district",
    "ward",
];

function mapApiErrorsToFields(err: unknown): Partial<Record<AddressFieldKey, string>> {
    const out: Partial<Record<AddressFieldKey, string>> = {};
    if (!err || typeof err !== "object") return out;
    const e = err as Partial<APIResponseError>;
    if (!e.errors || typeof e.errors !== "object") return out;
    for (const key of API_FIELD_KEYS) {
        const v = e.errors[key];
        if (typeof v === "string" && v.trim()) out[key] = v.trim();
    }
    return out;
}

const Checkout: React.FC = () => {
    const { items, clearCart } = useCart();
    const { isAuth } = useAuth();
    const { addNotification } = useNotification();

    const [step, setStep] = useState<"checkout" | "success">("checkout");
    const [orderCode, setOrderCode] = useState("");

    const [books, setBooks] = useState<Book[]>([]);
    const [loadingBooks, setLoadingBooks] = useState(() => items.length > 0);

    const [addresses, setAddresses] = useState<SavedAddress[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);

    const [useNewAddress, setUseNewAddress] = useState(false);
    const [selectedAddressIdOverride, setSelectedAddressIdOverride] = useState<string | null>(null);
    const [form, setForm] = useState<CreateAddressRequestDTO>({ ...emptyForm });
    const [orderNote, setOrderNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "transfer">("cod");
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<AddressFieldKey, string>>>({});
    const [submitError, setSubmitError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const productIdsKey = useMemo(
        () => items.map((it) => it.productId).sort().join(","),
        [items]
    );

    useEffect(() => {
        if (!items.length) return;
        setLoadingBooks(true);
        const ids = items.map((it) => it.productId);
        bookApi
            .getBookByIds(ids)
            .then((res) => {
                const list = Array.isArray(res?.data) ? res.data : [];
                setBooks(list);
            })
            .catch(() => setBooks([]))
            .finally(() => setLoadingBooks(false));
    }, [productIdsKey, items]);

    useEffect(() => {
        if (!isAuth) return;
        let mounted = true;
        setLoadingAddresses(true);
        userApi
            .getAddresses()
            .then((res) => {
                const list = (res?.data ?? []) as SavedAddress[];
                if (!mounted) return;
                setAddresses(Array.isArray(list) ? list : []);
            })
            .catch(() => {
                if (mounted) setAddresses([]);
            })
            .finally(() => {
                if (mounted) setLoadingAddresses(false);
            });
        return () => {
            mounted = false;
        };
    }, [isAuth]);

    const savedAddresses = useMemo(() => (isAuth ? addresses : []), [isAuth, addresses]);

    const preferredAddressId = useMemo(() => {
        if (!savedAddresses.length) return "";
        return (savedAddresses.find((a) => a.isDefault) ?? savedAddresses[0])?.id ?? "";
    }, [savedAddresses]);

    const selectedAddressId = selectedAddressIdOverride ?? preferredAddressId;

    const showAddressForm = !isAuth || !savedAddresses.length || useNewAddress;

    const clearFieldError = (key: AddressFieldKey) => {
        setFieldErrors((prev) => {
            if (prev[key] == null) return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const bookMap = useMemo(() => {
        const map: Record<string, Book> = {};
        books.forEach((b) => {
            const id = String((b as unknown as { id?: string }).id ?? "");
            if (id) map[id] = b;
        });
        return map;
    }, [books]);

    const { subtotal, shippingFee, total, missingBooks } = useMemo(() => {
        let sub = 0;
        const missing: string[] = [];
        for (const it of items) {
            const book = bookMap[it.productId];
            if (!book) {
                missing.push(it.productId);
                continue;
            }
            sub += getBookPrice(book) * it.quantity;
        }
        const ship = sub >= FREE_SHIP_THRESHOLD || sub === 0 ? 0 : SHIPPING_FLAT;
        return {
            subtotal: sub,
            shippingFee: ship,
            total: sub + ship,
            missingBooks: missing,
        };
    }, [items, bookMap]);

    const effectiveAddress = (): CreateAddressRequestDTO | null => {
        if (!isAuth || savedAddresses.length === 0 || useNewAddress) {
            return form;
        }
        const a = savedAddresses.find((x) => x.id === selectedAddressId) ?? savedAddresses[0];
        if (!a) return form;
        return {
            fullName: a.fullName,
            phoneNumber: a.phoneNumber,
            addressDetail: a.addressDetail,
            city: a.city,
            district: a.district,
            ward: a.ward,
            isDefault: false,
        };
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldErrors({});
        setSubmitError("");
        if (!items.length) {
            addNotification("error", "Giỏ hàng trống");
            return;
        }
        if (missingBooks.length > 0) {
            setSubmitError("Một số sản phẩm không còn trong hệ thống. Vui lòng cập nhật giỏ hàng.");
            addNotification("error", "Có sản phẩm không hợp lệ trong giỏ");
            return;
        }
        const addr = effectiveAddress();
        if (!addr) {
            setSubmitError("Không lấy được địa chỉ giao hàng.");
            return;
        }
        const fieldErrs = validateAddressFields(addr);
        if (Object.keys(fieldErrs).length > 0) {
            if (showAddressForm) {
                setFieldErrors(fieldErrs);
            } else {
                setSubmitError(
                    "Địa chỉ đã lưu không hợp lệ. Vui lòng chọn địa chỉ khác hoặc nhập địa chỉ mới."
                );
            }
            addNotification("error", "Vui lòng kiểm tra thông tin giao hàng");
            return;
        }

        setSubmitting(true);
        try {
            const res = await orderApi.createOrder({
                items: items.map((it) => ({
                    bookId: it.productId,
                    quantity: it.quantity,
                })),
                paymentType: paymentMethod === "cod" ? "COD" : "QR",
                fullName: addr.fullName.trim(),
                phoneNumber: normalizePhoneForOrder(addr.phoneNumber),
                addressDetail: addr.addressDetail.trim(),
                city: addr.city.trim(),
                district: addr.district.trim(),
                ward: addr.ward.trim(),
                note: orderNote.trim(),
            });

            const fromApi = pickOrderCodeFromResponse(res.data);
            const code =
                fromApi ||
                `FH${Date.now().toString(36).toUpperCase().slice(-10)}`;

            clearCart();
            setOrderCode(code);
            setStep("success");
            addNotification("success", res.message?.trim() || "Đặt hàng thành công");
        } catch (unknownErr: unknown) {
            const mapped = mapApiErrorsToFields(unknownErr);
            const msg = getCheckoutErrorMessage(unknownErr);
            if (Object.keys(mapped).length > 0) {
                if (showAddressForm) {
                    setFieldErrors(mapped);
                    setSubmitError("");
                } else {
                    setFieldErrors({});
                    setSubmitError(msg);
                }
            } else {
                setFieldErrors({});
                setSubmitError(msg);
            }
            addNotification("error", msg);
        } finally {
            setSubmitting(false);
        }
    };

    if (step === "success") {
        return (
            <div className={styles.page}>
                <div className={styles.success}>
                    <div className={styles.successIcon} aria-hidden>
                        <FiCheckCircle size={40} strokeWidth={1.5} />
                    </div>
                    <h1 className={styles.successTitle}>Đặt hàng thành công</h1>
                    <p className={styles.successCode}>
                        Mã đơn hàng: <span className={styles.code}>{orderCode}</span>
                    </p>
                    <p className={styles.successHint}>
                        Cảm ơn bạn đã mua sắm. Bạn có thể tiếp tục xem sách hoặc vào tài khoản để theo dõi đơn (nếu
                        có).
                    </p>
                    <div className={styles.successActions}>
                        <NavLink to="/products" className={styles.btnPrimary}>
                            Tiếp tục mua sắm
                        </NavLink>
                        <NavLink to="/" className={styles.btnSecondary}>
                            Về trang chủ
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className={styles.page}>
                <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                    <NavLink to="/">Trang chủ</NavLink>
                    <FiChevronRight className={styles.breadcrumbSep} aria-hidden />
                    <span className={styles.breadcrumbCurrent}>Thanh toán</span>
                </nav>
                <div className={styles.empty}>
                    <div className={styles.emptyIcon} aria-hidden>
                        <FiShoppingBag size={40} strokeWidth={1.25} />
                    </div>
                    <h1 className={styles.emptyTitle}>Giỏ hàng đang trống</h1>
                    <p className={styles.emptyText}>Thêm sách vào giỏ để tiến hành thanh toán.</p>
                    <NavLink to="/products" className={styles.emptyCta}>
                        Xem sản phẩm
                    </NavLink>
                </div>
            </div>
        );
    }

    if (loadingBooks) {
        return <Loading notify="Đang tải giỏ hàng..." />;
    }

    return (
        <div className={styles.page}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <NavLink to="/">Trang chủ</NavLink>
                <FiChevronRight className={styles.breadcrumbSep} aria-hidden />
                <NavLink to={{ pathname: "/profile", search: "?tab=cart" }}>Giỏ hàng</NavLink>
                <FiChevronRight className={styles.breadcrumbSep} aria-hidden />
                <span className={styles.breadcrumbCurrent}>Thanh toán</span>
            </nav>

            <h1 className={styles.title}>Thanh toán</h1>
            <p className={styles.subtitle}>Kiểm tra đơn hàng, địa chỉ giao hàng và phương thức thanh toán.</p>

            <form className={styles.layout} onSubmit={handlePlaceOrder}>
                <div>
                    <section className={styles.section}>
                        <div className={styles.sectionHead}>
                            <FiMapPin className={styles.sectionIcon} size={22} />
                            <h2 className={styles.sectionTitle}>Địa chỉ giao hàng</h2>
                        </div>

                        {isAuth && loadingAddresses ? (
                            <p className={styles.addressLoading}>Đang tải địa chỉ...</p>
                        ) : null}

                        {isAuth && savedAddresses.length > 0 && !useNewAddress ? (
                            <>
                                <div className={styles.addressList} role="radiogroup" aria-label="Chọn địa chỉ">
                                    {savedAddresses.map((a) => (
                                        <button
                                            key={a.id}
                                            type="button"
                                            className={`${styles.addressCard} ${
                                                selectedAddressId === a.id ? styles.addressCardSelected : ""
                                            }`}
                                            onClick={() => {
                                                setSelectedAddressIdOverride(a.id);
                                                setFieldErrors({});
                                                setSubmitError("");
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="addr"
                                                checked={selectedAddressId === a.id}
                                                onChange={() => {
                                                    setSelectedAddressIdOverride(a.id);
                                                    setFieldErrors({});
                                                    setSubmitError("");
                                                }}
                                                tabIndex={-1}
                                            />
                                            <div className={styles.addressLines}>
                                                <div className={styles.addressName}>
                                                    {a.fullName}
                                                    {a.isDefault ? (
                                                        <span className={styles.badgeDefault}>Mặc định</span>
                                                    ) : null}
                                                </div>
                                                <div className={styles.addressDetail}>
                                                    {a.phoneNumber}
                                                    <br />
                                                    {a.addressDetail}, {a.ward}, {a.district}, {a.city}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className={styles.toggleNew}
                                    onClick={() => {
                                        setUseNewAddress(true);
                                        setSelectedAddressIdOverride(null);
                                        setForm({ ...emptyForm });
                                        setFieldErrors({});
                                        setSubmitError("");
                                    }}
                                >
                                    + Giao đến địa chỉ khác (nhập mới)
                                </button>
                            </>
                        ) : null}

                        {showAddressForm ? (
                            <div className={styles.fieldGrid} style={{ marginTop: isAuth && savedAddresses.length ? 16 : 0 }}>
                                <div className={styles.fieldFull}>
                                    {isAuth && savedAddresses.length > 0 && useNewAddress ? (
                                        <button
                                            type="button"
                                            className={styles.toggleNew}
                                            onClick={() => {
                                                setUseNewAddress(false);
                                                setSelectedAddressIdOverride(null);
                                                setFieldErrors({});
                                                setSubmitError("");
                                            }}
                                            style={{ marginTop: 0, marginBottom: 12 }}
                                        >
                                            ← Quay lại địa chỉ đã lưu
                                        </button>
                                    ) : null}
                                </div>
                                <div>
                                    <label className={styles.label} htmlFor="ck-fullName">
                                        Họ và tên
                                    </label>
                                    <input
                                        id="ck-fullName"
                                        className={`${styles.input} ${fieldErrors.fullName ? styles.inputError : ""}`}
                                        value={form.fullName}
                                        onChange={(e) => {
                                            setForm((f) => ({ ...f, fullName: e.target.value }));
                                            clearFieldError("fullName");
                                        }}
                                        placeholder="Nguyễn Văn A"
                                        autoComplete="name"
                                        aria-invalid={!!fieldErrors.fullName}
                                        aria-describedby={fieldErrors.fullName ? "ck-fullName-error" : undefined}
                                    />
                                    {fieldErrors.fullName ? (
                                        <p id="ck-fullName-error" className={styles.fieldError} role="alert">
                                            {fieldErrors.fullName}
                                        </p>
                                    ) : null}
                                </div>
                                <div>
                                    <label className={styles.label} htmlFor="ck-phone">
                                        Số điện thoại
                                    </label>
                                    <input
                                        id="ck-phone"
                                        className={`${styles.input} ${fieldErrors.phoneNumber ? styles.inputError : ""}`}
                                        value={form.phoneNumber}
                                        onChange={(e) => {
                                            setForm((f) => ({ ...f, phoneNumber: e.target.value }));
                                            clearFieldError("phoneNumber");
                                        }}
                                        placeholder="0912345678"
                                        autoComplete="tel"
                                        aria-invalid={!!fieldErrors.phoneNumber}
                                        aria-describedby={fieldErrors.phoneNumber ? "ck-phone-error" : undefined}
                                    />
                                    {fieldErrors.phoneNumber ? (
                                        <p id="ck-phone-error" className={styles.fieldError} role="alert">
                                            {fieldErrors.phoneNumber}
                                        </p>
                                    ) : null}
                                </div>
                                <div className={styles.fieldFull}>
                                    <label className={styles.label} htmlFor="ck-detail">
                                        Địa chỉ chi tiết
                                    </label>
                                    <input
                                        id="ck-detail"
                                        className={`${styles.input} ${fieldErrors.addressDetail ? styles.inputError : ""}`}
                                        value={form.addressDetail}
                                        onChange={(e) => {
                                            setForm((f) => ({ ...f, addressDetail: e.target.value }));
                                            clearFieldError("addressDetail");
                                        }}
                                        placeholder="Ví dụ: 12 Nguyễn Huệ, phường Bến Nghé"
                                        aria-invalid={!!fieldErrors.addressDetail}
                                        aria-describedby={fieldErrors.addressDetail ? "ck-detail-error" : undefined}
                                    />
                                    {fieldErrors.addressDetail ? (
                                        <p id="ck-detail-error" className={styles.fieldError} role="alert">
                                            {fieldErrors.addressDetail}
                                        </p>
                                    ) : null}
                                </div>
                                <div>
                                    <label className={styles.label} htmlFor="ck-city">
                                        Tỉnh / Thành phố
                                    </label>
                                    <input
                                        id="ck-city"
                                        className={`${styles.input} ${fieldErrors.city ? styles.inputError : ""}`}
                                        value={form.city}
                                        onChange={(e) => {
                                            setForm((f) => ({ ...f, city: e.target.value }));
                                            clearFieldError("city");
                                        }}
                                        placeholder="Ví dụ: Hà Nội"
                                        aria-invalid={!!fieldErrors.city}
                                        aria-describedby={fieldErrors.city ? "ck-city-error" : undefined}
                                    />
                                    {fieldErrors.city ? (
                                        <p id="ck-city-error" className={styles.fieldError} role="alert">
                                            {fieldErrors.city}
                                        </p>
                                    ) : null}
                                </div>
                                <div>
                                    <label className={styles.label} htmlFor="ck-district">
                                        Quận / Huyện
                                    </label>
                                    <input
                                        id="ck-district"
                                        className={`${styles.input} ${fieldErrors.district ? styles.inputError : ""}`}
                                        value={form.district}
                                        onChange={(e) => {
                                            setForm((f) => ({ ...f, district: e.target.value }));
                                            clearFieldError("district");
                                        }}
                                        placeholder="Ví dụ: Quận Hoàn Kiếm"
                                        aria-invalid={!!fieldErrors.district}
                                        aria-describedby={fieldErrors.district ? "ck-district-error" : undefined}
                                    />
                                    {fieldErrors.district ? (
                                        <p id="ck-district-error" className={styles.fieldError} role="alert">
                                            {fieldErrors.district}
                                        </p>
                                    ) : null}
                                </div>
                                <div className={styles.fieldFull}>
                                    <label className={styles.label} htmlFor="ck-ward">
                                        Phường / Xã
                                    </label>
                                    <input
                                        id="ck-ward"
                                        className={`${styles.input} ${fieldErrors.ward ? styles.inputError : ""}`}
                                        value={form.ward}
                                        onChange={(e) => {
                                            setForm((f) => ({ ...f, ward: e.target.value }));
                                            clearFieldError("ward");
                                        }}
                                        placeholder="Ví dụ: Phường Tràng Tiền"
                                        aria-invalid={!!fieldErrors.ward}
                                        aria-describedby={fieldErrors.ward ? "ck-ward-error" : undefined}
                                    />
                                    {fieldErrors.ward ? (
                                        <p id="ck-ward-error" className={styles.fieldError} role="alert">
                                            {fieldErrors.ward}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}

                        <div className={styles.fieldFull} style={{ marginTop: 18 }}>
                            <label className={styles.label} htmlFor="ck-note">
                                Ghi chú đơn hàng (tuỳ chọn)
                            </label>
                            <textarea
                                id="ck-note"
                                className={styles.textarea}
                                value={orderNote}
                                onChange={(e) => setOrderNote(e.target.value)}
                                placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao..."
                                rows={3}
                            />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHead}>
                            <FiCreditCard className={styles.sectionIcon} size={22} />
                            <h2 className={styles.sectionTitle}>Phương thức thanh toán</h2>
                        </div>
                        <div className={styles.paymentOptions}>
                            <label
                                className={`${styles.paymentOption} ${
                                    paymentMethod === "cod" ? styles.paymentOptionActive : ""
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="pay"
                                    checked={paymentMethod === "cod"}
                                    onChange={() => setPaymentMethod("cod")}
                                />
                                <div>
                                    <div className={styles.paymentLabel}>Thanh toán khi nhận hàng (COD)</div>
                                    <div className={styles.paymentHint}>Thanh toán bằng tiền mặt khi nhận sách.</div>
                                </div>
                            </label>
                            <label
                                className={`${styles.paymentOption} ${
                                    paymentMethod === "transfer" ? styles.paymentOptionActive : ""
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="pay"
                                    checked={paymentMethod === "transfer"}
                                    onChange={() => setPaymentMethod("transfer")}
                                />
                                <div>
                                    <div className={styles.paymentLabel}>Chuyển khoản ngân hàng</div>
                                    <div className={styles.paymentHint}>
                                        Thanh toán trước qua tài khoản (thông tin chi tiết sẽ gửi qua email — demo).
                                    </div>
                                </div>
                            </label>
                        </div>
                    </section>

                    {submitError ? <div className={styles.errorBanner}>{submitError}</div> : null}
                </div>

                <aside className={styles.summary}>
                    <div className={styles.sectionHead} style={{ marginBottom: 12, border: "none", paddingBottom: 0 }}>
                        <FiPackage className={styles.sectionIcon} size={22} />
                        <h2 className={styles.summaryTitle} style={{ margin: 0 }}>
                            Đơn hàng ({items.reduce((s, i) => s + i.quantity, 0)} sản phẩm)
                        </h2>
                    </div>

                    <div className={styles.lineItems}>
                        {items.map((it) => {
                            const book = bookMap[it.productId];
                            const imageUrl = book?.primaryImage?.url;
                            const title = book?.title ?? `Sản phẩm #${it.productId}`;
                            const price = book ? getBookPrice(book) : 0;
                            return (
                                <div key={it.productId} className={styles.lineItem}>
                                    <div className={styles.thumb}>
                                        {imageUrl ? (
                                            <LazyImage
                                                src={imageUrl}
                                                alt=""
                                                className={styles.thumbImg}
                                                placeholder={<BookPlaceholderIcon size={20} />}
                                            />
                                        ) : (
                                            <BookPlaceholderIcon size={20} />
                                        )}
                                    </div>
                                    <div className={styles.lineBody}>
                                        <NavLink to={`/products/${it.productId}`} className={styles.lineTitle}>
                                            {title}
                                        </NavLink>
                                        <div className={styles.lineMeta}>
                                            {formatPrice(price)} × {it.quantity}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.row}>
                        <span className={styles.rowMuted}>Tạm tính</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.rowMuted}>Phí vận chuyển</span>
                        <span>{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</span>
                    </div>
                    {subtotal > 0 && subtotal < FREE_SHIP_THRESHOLD ? (
                        <p className={styles.secureNote} style={{ textAlign: "left", marginTop: -4 }}>
                            Mua thêm {formatPrice(FREE_SHIP_THRESHOLD - subtotal)} để được miễn phí vận chuyển.
                        </p>
                    ) : null}
                    <div className={`${styles.row} ${styles.rowTotal}`}>
                        <span>Tổng cộng</span>
                        <span>{formatPrice(total)}</span>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={submitting}>
                        {submitting ? "Đang xử lý..." : "Đặt hàng"}
                    </button>
                    <p className={styles.secureNote}>
                        Đặt hàng là bạn đồng ý với điều khoản mua bán (demo). Không trừ tiền tự động.
                    </p>
                </aside>
            </form>
        </div>
    );
};

export default Checkout;
