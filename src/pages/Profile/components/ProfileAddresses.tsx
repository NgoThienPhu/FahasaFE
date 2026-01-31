import React, { useEffect, useState } from "react";
import styles from "./ProfileAddresses.module.css";
import { useNotification } from "../../../contexts/NotificationContext";
import userApi, { type CreateAddressRequestDTO } from "../../../services/apis/userApi";
import addressApi from "../../../services/apis/addressApi";
import { FiMapPin, FiPhone, FiEdit2, FiTrash2, FiHome, FiPlus, FiArrowLeft } from "react-icons/fi";

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
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    const validate = (): string | null => {
        const fullName = form.fullName.trim();
        const phoneNumber = form.phoneNumber.trim().replace(/\s/g, "");
        const addressDetail = form.addressDetail.trim();
        const city = form.city.trim();
        const district = form.district.trim();
        const ward = form.ward.trim();

        if (!fullName) return "Vui lòng nhập họ và tên";
        if (fullName.length < 2) return "Họ và tên phải có ít nhất 2 ký tự";

        if (!phoneNumber) return "Vui lòng nhập số điện thoại";
        const phoneNormalized = phoneNumber.replace(/^\+84/, "0");
        const phoneRegex = /^0[35789][0-9]{8}$/;
        if (!phoneRegex.test(phoneNormalized)) return "Số điện thoại không hợp lệ (10 số, VD: 0912345678)";

        if (!addressDetail) return "Vui lòng nhập chi tiết địa chỉ";
        if (addressDetail.length < 5) return "Chi tiết địa chỉ phải có ít nhất 5 ký tự";

        if (!city) return "Vui lòng nhập tỉnh/thành phố";
        if (!district) return "Vui lòng nhập quận/huyện";
        if (!ward) return "Vui lòng nhập phường/xã";

        return null;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        setIsSubmitting(true);
        setError("");
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
            setError(err?.message ?? (editingId ? "Cập nhật địa chỉ thất bại" : "Thêm địa chỉ thất bại"));
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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Địa chỉ</h2>
                {(showForm || editingId !== null || addresses.length < 3) && (
                    <button
                        type="button"
                        className={styles.addBtnHeader}
                        onClick={() => {
                            setError("");
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
                                <FiArrowLeft size={18} />
                                Quay lại danh sách
                            </>
                        ) : (
                            <>
                                <FiPlus size={18} />
                                Thêm địa chỉ
                            </>
                        )}
                    </button>
                )}
            </div>

            {!showForm && !editingId && (
                <>
                    {isLoading ? (
                        <div className={styles.empty}>Đang tải địa chỉ...</div>
                    ) : addresses.length === 0 ? (
                        <div className={styles.emptyCard}>
                            <div className={styles.emptyIcon}>
                                <FiMapPin />
                            </div>
                            <p className={styles.emptyText}>Chưa có địa chỉ nào</p>
                            <p className={styles.emptySubtext}>Thêm địa chỉ để thuận tiện cho giao hàng</p>
                        </div>
                    ) : (
                        <div className={styles.listContainer}>
                            {addresses.map((a: any) => (
                                <div
                                    key={a.id}
                                    className={`${styles.addressCard} ${a.isDefault ? styles.defaultCard : ""}`}
                                >
                                    {a.isDefault && (
                                        <span className={styles.defaultBadge}>
                                            <FiHome className={styles.defaultBadgeIcon} />
                                            Mặc định
                                        </span>
                                    )}
                                    <div className={styles.addressMain}>
                                        <div className={styles.addressContent}>
                                            <div className={styles.addressHeader}>
                                                <div className={styles.addressTitle}>
                                                    <h3 className={styles.addressName}>{a.fullName}</h3>
                                                    <div className={styles.addressMeta}>
                                                        <FiPhone className={styles.metaIcon} />
                                                        <span className={styles.addressPhone}>{a.phoneNumber}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.addressLine}>
                                                <div className={styles.addressIcon}>
                                                    <FiMapPin />
                                                </div>
                                                <div>
                                                    <div className={styles.addressDetail}>{a.addressDetail}</div>
                                                    <div className={styles.addressLocation}>
                                                        {a.ward && `${a.ward}, `}
                                                        {a.district && `${a.district}, `}
                                                        {a.city}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.actionBtns}>
                                            <button
                                                className={styles.editBtn}
                                                title="Chỉnh sửa"
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
                                                    setError("");
                                                }}
                                            >
                                                <FiEdit2 />
                                            </button>
                                            <button
                                                className={styles.deleteBtn}
                                                title="Xóa"
                                                onClick={() => openDeleteConfirm(a.id)}
                                                disabled={deletingId === a.id}
                                            >
                                                <FiTrash2 />
                                            </button>
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
                    <h3 className={styles.formTitle}>
                        {editingId ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
                    </h3>
                    <p className={styles.formDescription}>
                        {editingId
                            ? "Cập nhật thông tin địa chỉ bên dưới và bấm lưu."
                            : "Vui lòng nhập đầy đủ thông tin bên dưới để lưu địa chỉ giao hàng của bạn."}
                    </p>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {error && <div className={styles.formError}>{error}</div>}

                        <div className={styles.rowTwo}>
                            <div className={styles.formGroup}>
                                <label>Họ và tên</label>
                                <input
                                    placeholder="Ví dụ: Nguyễn Văn A"
                                    className={styles.input}
                                    value={form.fullName}
                                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Số điện thoại</label>
                                <input
                                    placeholder="Ví dụ: 0912345678"
                                    className={styles.input}
                                    value={form.phoneNumber}
                                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Chi tiết địa chỉ</label>
                            <input
                                placeholder="Số nhà, tên đường, ví dụ: Số 1, Phố A"
                                className={styles.input}
                                value={form.addressDetail}
                                onChange={(e) => setForm({ ...form, addressDetail: e.target.value })}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroupSmall}>
                                <label>Tỉnh/Thành phố</label>
                                <input
                                    placeholder="Ví dụ: Hà Nội"
                                    className={styles.input}
                                    value={form.city}
                                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroupSmall}>
                                <label>Quận/Huyện</label>
                                <input
                                    placeholder="Ví dụ: Quận Hoàn Kiếm"
                                    className={styles.input}
                                    value={form.district}
                                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroupSmall}>
                                <label>Phường/Xã</label>
                                <input
                                    placeholder="Ví dụ: Phường Tràng Tiền"
                                    className={styles.input}
                                    value={form.ward}
                                    onChange={(e) => setForm({ ...form, ward: e.target.value })}
                                />
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
                            {!!editingId && !!form.isDefault && (
                                <span className={styles.checkboxHint}>(đã là địa chỉ mặc định)</span>
                            )}
                        </label>

                        <div className={styles.formActions}>
                            <button
                                type="button"
                                className={styles.btnCancel}
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingId(null);
                                    setError("");
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
                                {isSubmitting
                                    ? "Đang lưu..."
                                    : editingId
                                      ? "Cập nhật địa chỉ"
                                      : "Lưu địa chỉ"}
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
