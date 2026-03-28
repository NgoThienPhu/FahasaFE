import React, { useEffect, useState } from "react";
import styles from "./ProfileAddresses.module.css";
import { useNotification } from "../../../contexts/NotificationContext";
import userApi, { type CreateAddressRequestDTO } from "../../../services/apis/userApi";
import addressApi from "../../../services/apis/addressApi";
import {
    FiMapPin,
    FiPhone,
    FiEdit2,
    FiTrash2,
    FiHome,
    FiPlus,
    FiArrowLeft,
    FiNavigation,
} from "react-icons/fi";

type AddressFieldKey = keyof Omit<CreateAddressRequestDTO, "isDefault">;

function validateAddressFields(form: CreateAddressRequestDTO): Partial<Record<AddressFieldKey, string>> {
    const errors: Partial<Record<AddressFieldKey, string>> = {};
    const fullName = form.fullName.trim();
    const phoneNumber = form.phoneNumber.trim().replace(/\s/g, "");
    const addressDetail = form.addressDetail.trim();
    const city = form.city.trim();
    const district = form.district.trim();
    const ward = form.ward.trim();

    if (!fullName) errors.fullName = "Vui lòng nhập họ và tên";
    else if (fullName.length < 2) errors.fullName = "Họ và tên phải có ít nhất 2 ký tự";

    if (!phoneNumber) errors.phoneNumber = "Vui lòng nhập số điện thoại";
    else {
        const phoneNormalized = phoneNumber.replace(/^\+84/, "0");
        const phoneRegex = /^0[35789][0-9]{8}$/;
        if (!phoneRegex.test(phoneNormalized)) {
            errors.phoneNumber = "Số điện thoại không hợp lệ (10 số, VD: 0912345678)";
        }
    }

    if (!addressDetail) errors.addressDetail = "Vui lòng nhập chi tiết địa chỉ";
    else if (addressDetail.length < 5) errors.addressDetail = "Chi tiết địa chỉ phải có ít nhất 5 ký tự";

    if (!city) errors.city = "Vui lòng nhập tỉnh/thành phố";
    if (!district) errors.district = "Vui lòng nhập quận/huyện";
    if (!ward) errors.ward = "Vui lòng nhập phường/xã";

    return errors;
}

const ProfileAddresses: React.FC = () => {
    const { addNotification } = useNotification();

    const [addresses, setAddresses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<CreateAddressRequestDTO>({
        fullName: "",
        phoneNumber: "",
        addressDetail: "",
        city: "",
        district: "",
        ward: "",
        isDefault: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<AddressFieldKey, string>>>({});
    const [submitError, setSubmitError] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    const clearFieldError = (key: AddressFieldKey) => {
        setFieldErrors((prev) => {
            if (!prev[key]) return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const errs = validateAddressFields(form);
        if (Object.keys(errs).length > 0) {
            setFieldErrors(errs);
            setSubmitError("");
            return;
        }

        setIsSubmitting(true);
        setFieldErrors({});
        setSubmitError("");
        try {
            if (editingId) {
                await addressApi.updateAddress(editingId, {
                    fullName: form.fullName,
                    phoneNumber: form.phoneNumber,
                    addressDetail: form.addressDetail,
                    city: form.city,
                    district: form.district,
                    ward: form.ward,
                    isDefault: form.isDefault ?? false,
                });
                addNotification("success", "Đã cập nhật địa chỉ");
                setEditingId(null);
            } else {
                await userApi.createAddress(form);
                addNotification("success", "Thêm địa chỉ thành công");
            }
            setShowForm(false);
            setForm({
                fullName: "",
                phoneNumber: "",
                addressDetail: "",
                city: "",
                district: "",
                ward: "",
                isDefault: false,
            });
            const res = await userApi.getAddresses();
            setAddresses(res.data || []);
        } catch (err: any) {
            setSubmitError(err?.message ?? (editingId ? "Cập nhật địa chỉ thất bại" : "Thêm địa chỉ thất bại"));
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setIsLoading(true);
            try {
                const res = await userApi.getAddresses();
                if (mounted) setAddresses(res.data || []);
            } catch (e: any) {
                console.error("Lấy danh sách địa chỉ thất bại", e);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    const openDeleteConfirm = (addressId: string) => {
        if (addressId) setConfirmDeleteId(addressId);
    };

    const closeDeleteConfirm = () => setConfirmDeleteId(null);

    const handleDeleteAddress = async () => {
        const addressId = confirmDeleteId;
        if (!addressId) return;
        setDeletingId(addressId);
        try {
            await addressApi.deleteAddress(addressId);
            addNotification("success", "Đã xóa địa chỉ");
            const res = await userApi.getAddresses();
            setAddresses(res.data || []);
            setConfirmDeleteId(null);
        } catch (err: any) {
            addNotification("error", err?.message || "Xóa địa chỉ thất bại");
        } finally {
            setDeletingId(null);
        }
    };

    const canAddMore = addresses.length < 3;
    const listCount = addresses.length;

    return (
        <div className={styles.container}>
            <header className={styles.pageHeader}>
                <div className={styles.headerText}>
                    <div className={styles.headerIconWrap} aria-hidden>
                        <FiNavigation size={22} strokeWidth={2} />
                    </div>
                    <div className={styles.headerTextCol}>
                        <h2 className={styles.pageTitle}>Địa chỉ giao hàng</h2>
                        <p className={styles.pageSubtitle}>
                            {showForm || editingId
                                ? editingId
                                    ? "Cập nhật thông tin nhận hàng của bạn."
                                    : "Thêm địa chỉ mới — tối đa 3 địa chỉ."
                                : `Đang có ${listCount}/3 địa chỉ đã lưu.`}
                        </p>
                    </div>
                </div>
                {(showForm || editingId !== null || canAddMore) && (
                    <button
                        type="button"
                        className={showForm || editingId ? styles.btnGhost : styles.addBtnHeader}
                        onClick={() => {
                            setFieldErrors({});
                            setSubmitError("");
                            setEditingId(null);
                            setForm({
                                fullName: "",
                                phoneNumber: "",
                                addressDetail: "",
                                city: "",
                                district: "",
                                ward: "",
                                isDefault: false,
                            });
                            setShowForm((prev) => !prev);
                        }}
                        disabled={isSubmitting}
                    >
                        {showForm || editingId ? (
                            <>
                                <FiArrowLeft size={18} aria-hidden />
                                Quay lại danh sách
                            </>
                        ) : (
                            <>
                                <FiPlus size={18} aria-hidden />
                                Thêm địa chỉ
                            </>
                        )}
                    </button>
                )}
            </header>

            {!showForm && !editingId && (
                <>
                    {isLoading ? (
                        <div className={styles.skeletonWrap} aria-busy="true">
                            <div className={styles.skeletonCard}>
                                <span className={styles.skelLine} style={{ width: "40%" }} />
                                <span className={styles.skelLine} style={{ width: "70%" }} />
                                <span className={styles.skelLine} style={{ width: "90%" }} />
                            </div>
                            <div className={styles.skeletonCard}>
                                <span className={styles.skelLine} style={{ width: "45%" }} />
                                <span className={styles.skelLine} style={{ width: "65%" }} />
                                <span className={styles.skelLine} style={{ width: "85%" }} />
                            </div>
                        </div>
                    ) : addresses.length === 0 ? (
                        <div className={styles.emptyWrap}>
                            <div className={styles.emptyCard}>
                                <div className={styles.emptyGlow} aria-hidden />
                                <div className={styles.emptyIcon}>
                                    <FiMapPin size={30} strokeWidth={1.5} aria-hidden />
                                </div>
                                <p className={styles.emptyText}>Chưa có địa chỉ giao hàng</p>
                                <p className={styles.emptySubtext}>
                                    Lưu địa chỉ để đặt hàng nhanh hơn và theo dõi giao nhận thuận tiện.
                                </p>
                                {canAddMore && (
                                    <button
                                        type="button"
                                        className={styles.emptyCta}
                                        onClick={() => {
                                            setFieldErrors({});
                                            setSubmitError("");
                                            setEditingId(null);
                                            setForm({
                                                fullName: "",
                                                phoneNumber: "",
                                                addressDetail: "",
                                                city: "",
                                                district: "",
                                                ward: "",
                                                isDefault: false,
                                            });
                                            setShowForm(true);
                                        }}
                                    >
                                        <FiPlus size={18} aria-hidden />
                                        Thêm địa chỉ đầu tiên
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.listContainer}>
                            {addresses.map((a: any) => (
                                <div
                                    key={a.id}
                                    className={`${styles.addressCard} ${a.isDefault ? styles.defaultCard : ""}`}
                                >
                                    <div className={styles.cardInner}>
                                        <div className={styles.addressMain}>
                                            <div className={styles.addressContent}>
                                                <div className={styles.addressHeader}>
                                                    <div className={styles.nameRow}>
                                                        <h3 className={styles.addressName}>{a.fullName}</h3>
                                                        {a.isDefault && (
                                                            <span className={styles.defaultBadge}>
                                                                <FiHome size={14} strokeWidth={2} aria-hidden />
                                                                Mặc định
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className={styles.phonePill}>
                                                        <FiPhone size={14} strokeWidth={2} aria-hidden />
                                                        <span>{a.phoneNumber}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.addressBlock}>
                                                    <span className={styles.pinIcon} aria-hidden>
                                                        <FiMapPin size={18} />
                                                    </span>
                                                    <div>
                                                        <p className={styles.addressDetail}>{a.addressDetail}</p>
                                                        <p className={styles.addressLocation}>
                                                            {[a.ward, a.district, a.city].filter(Boolean).join(", ")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.actionBtns}>
                                                <button
                                                    type="button"
                                                    className={styles.editBtn}
                                                    title="Chỉnh sửa"
                                                    aria-label="Chỉnh sửa địa chỉ"
                                                    onClick={() => {
                                                        setEditingId(a.id);
                                                        setForm({
                                                            fullName: a.fullName ?? "",
                                                            phoneNumber: a.phoneNumber ?? "",
                                                            addressDetail: a.addressDetail ?? "",
                                                            city: a.city ?? "",
                                                            district: a.district ?? "",
                                                            ward: a.ward ?? "",
                                                            isDefault: !!a.isDefault,
                                                        });
                                                        setShowForm(true);
                                                        setFieldErrors({});
                                                        setSubmitError("");
                                                    }}
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={styles.deleteBtn}
                                                    title="Xóa địa chỉ"
                                                    aria-label="Xóa địa chỉ"
                                                    onClick={() => openDeleteConfirm(a.id)}
                                                    disabled={deletingId === a.id}
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {(showForm || editingId) && (
                <div className={styles.formCard}>
                    <div className={styles.formCardHead}>
                        <h3 className={styles.formTitle}>
                            {editingId ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
                        </h3>
                        <p className={styles.formHint}>
                            Thông tin dùng để giao hàng — vui lòng điền chính xác.
                        </p>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {submitError && <div className={styles.formError}>{submitError}</div>}

                        <p className={styles.formSectionLabel}>Người nhận</p>
                        <div className={styles.rowTwo}>
                            <div className={styles.formGroup}>
                                <label htmlFor="addr-fullName">Họ tên</label>
                                <input
                                    id="addr-fullName"
                                    placeholder="Nguyễn Văn A"
                                    className={`${styles.input} ${fieldErrors.fullName ? styles.inputError : ""}`}
                                    value={form.fullName}
                                    onChange={(e) => {
                                        setForm({ ...form, fullName: e.target.value });
                                        clearFieldError("fullName");
                                    }}
                                    aria-invalid={!!fieldErrors.fullName}
                                    aria-describedby={fieldErrors.fullName ? "err-fullName" : undefined}
                                />
                                {fieldErrors.fullName && (
                                    <span id="err-fullName" className={styles.fieldError} role="alert">
                                        {fieldErrors.fullName}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="addr-phone">SĐT</label>
                                <input
                                    id="addr-phone"
                                    placeholder="0912345678"
                                    className={`${styles.input} ${fieldErrors.phoneNumber ? styles.inputError : ""}`}
                                    value={form.phoneNumber}
                                    onChange={(e) => {
                                        setForm({ ...form, phoneNumber: e.target.value });
                                        clearFieldError("phoneNumber");
                                    }}
                                    aria-invalid={!!fieldErrors.phoneNumber}
                                    aria-describedby={fieldErrors.phoneNumber ? "err-phone" : undefined}
                                />
                                {fieldErrors.phoneNumber && (
                                    <span id="err-phone" className={styles.fieldError} role="alert">
                                        {fieldErrors.phoneNumber}
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className={styles.formSectionLabel}>Địa chỉ</p>
                        <div className={styles.formGroup}>
                            <label htmlFor="addr-detail">Số nhà, đường</label>
                            <input
                                id="addr-detail"
                                placeholder="Số nhà, đường"
                                className={`${styles.input} ${fieldErrors.addressDetail ? styles.inputError : ""}`}
                                value={form.addressDetail}
                                onChange={(e) => {
                                    setForm({ ...form, addressDetail: e.target.value });
                                    clearFieldError("addressDetail");
                                }}
                                aria-invalid={!!fieldErrors.addressDetail}
                                aria-describedby={fieldErrors.addressDetail ? "err-addressDetail" : undefined}
                            />
                            {fieldErrors.addressDetail && (
                                <span id="err-addressDetail" className={styles.fieldError} role="alert">
                                    {fieldErrors.addressDetail}
                                </span>
                            )}
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroupSmall}>
                                <label htmlFor="addr-city">Tỉnh/TP</label>
                                <input
                                    id="addr-city"
                                    placeholder="Hà Nội"
                                    className={`${styles.input} ${fieldErrors.city ? styles.inputError : ""}`}
                                    value={form.city}
                                    onChange={(e) => {
                                        setForm({ ...form, city: e.target.value });
                                        clearFieldError("city");
                                    }}
                                    aria-invalid={!!fieldErrors.city}
                                    aria-describedby={fieldErrors.city ? "err-city" : undefined}
                                />
                                {fieldErrors.city && (
                                    <span id="err-city" className={styles.fieldError} role="alert">
                                        {fieldErrors.city}
                                    </span>
                                )}
                            </div>
                            <div className={styles.formGroupSmall}>
                                <label htmlFor="addr-district">Quận/Huyện</label>
                                <input
                                    id="addr-district"
                                    placeholder="Hoàn Kiếm"
                                    className={`${styles.input} ${fieldErrors.district ? styles.inputError : ""}`}
                                    value={form.district}
                                    onChange={(e) => {
                                        setForm({ ...form, district: e.target.value });
                                        clearFieldError("district");
                                    }}
                                    aria-invalid={!!fieldErrors.district}
                                    aria-describedby={fieldErrors.district ? "err-district" : undefined}
                                />
                                {fieldErrors.district && (
                                    <span id="err-district" className={styles.fieldError} role="alert">
                                        {fieldErrors.district}
                                    </span>
                                )}
                            </div>
                            <div className={styles.formGroupSmall}>
                                <label htmlFor="addr-ward">Phường/Xã</label>
                                <input
                                    id="addr-ward"
                                    placeholder="Tràng Tiền"
                                    className={`${styles.input} ${fieldErrors.ward ? styles.inputError : ""}`}
                                    value={form.ward}
                                    onChange={(e) => {
                                        setForm({ ...form, ward: e.target.value });
                                        clearFieldError("ward");
                                    }}
                                    aria-invalid={!!fieldErrors.ward}
                                    aria-describedby={fieldErrors.ward ? "err-ward" : undefined}
                                />
                                {fieldErrors.ward && (
                                    <span id="err-ward" className={styles.fieldError} role="alert">
                                        {fieldErrors.ward}
                                    </span>
                                )}
                            </div>
                        </div>

                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={!!form.isDefault}
                                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                                disabled={!!editingId && !!form.isDefault}
                            />{" "}
                            Đặt làm địa chỉ mặc định
                            {!!editingId && !!form.isDefault ? (
                                <span className={styles.checkboxHint}> (đang mặc định)</span>
                            ) : null}
                        </label>

                        <div className={styles.formActions}>
                            <button
                                type="button"
                                className={styles.btnCancel}
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingId(null);
                                    setFieldErrors({});
                                    setSubmitError("");
                                    setForm({
                                        fullName: "",
                                        phoneNumber: "",
                                        addressDetail: "",
                                        city: "",
                                        district: "",
                                        ward: "",
                                        isDefault: false,
                                    });
                                }}
                                disabled={isSubmitting}
                            >
                                Hủy
                            </button>
                            <button type="submit" className={styles.btnSave} disabled={isSubmitting}>
                                {isSubmitting ? "Đang lưu..." : editingId ? "Cập nhật" : "Lưu"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {confirmDeleteId && (
                <div className={styles.deleteOverlay} onClick={closeDeleteConfirm} aria-hidden>
                    <div
                        className={styles.deleteModal}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-labelledby="delete-modal-title"
                        aria-modal="true"
                    >
                        <h3 id="delete-modal-title" className={styles.deleteModalTitle}>
                            Xóa địa chỉ
                        </h3>
                        <p className={styles.deleteModalText}>
                            Bạn có chắc muốn xóa địa chỉ này? Hành động này không thể hoàn tác.
                        </p>
                        <div className={styles.deleteModalActions}>
                            <button
                                type="button"
                                className={styles.deleteModalCancel}
                                onClick={closeDeleteConfirm}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className={styles.deleteModalConfirm}
                                onClick={handleDeleteAddress}
                                disabled={!!deletingId}
                            >
                                {deletingId ? "Đang xóa..." : "Xóa địa chỉ"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProfileAddresses;
