import React, { useEffect, useState } from "react";
import styles from "./ProfileAddresses.module.css";
import { useNotification } from "../../../contexts/NotificationContext";
import userApi, { type CreateAddressRequestDTO } from "../../../services/apis/userApi";
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

    const validate = () => {
        if (!form.fullName.trim()) return "Vui lòng nhập họ và tên";
        if (!form.phoneNumber.trim()) return "Vui lòng nhập số điện thoại";
        if (!form.addressDetail.trim()) return "Vui lòng nhập chi tiết địa chỉ";
        if (!form.city.trim()) return "Vui lòng chọn thành phố";
        if (!form.district.trim()) return "Vui lòng chọn quận/huyện";
        if (!form.ward.trim()) return "Vui lòng chọn phường/xã";
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
            await userApi.createAddress(form);
            addNotification("success", "Thêm địa chỉ thành công");
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
            setError(err?.message || "Thêm địa chỉ thất bại");
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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Địa chỉ</h2>
                <button
                    type="button"
                    className={styles.addBtnHeader}
                    onClick={() => {
                        setError("");
                        setShowForm((prev) => !prev);
                    }}
                    disabled={isSubmitting}
                >
                    {showForm ? (
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
            </div>

            {!showForm && (
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
                            {addresses.map((a: any, idx: number) => (
                                <div
                                    key={idx}
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
                                            <button className={styles.editBtn} title="Chỉnh sửa">
                                                <FiEdit2 />
                                            </button>
                                            <button className={styles.deleteBtn} title="Xóa">
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

            {showForm && (
                <div className={styles.formCard}>
                    <h3 className={styles.formTitle}>Thêm địa chỉ mới</h3>
                    <p className={styles.formDescription}>
                        Vui lòng nhập đầy đủ thông tin bên dưới để lưu địa chỉ giao hàng của bạn.
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
                            />{" "}
                            Đặt làm địa chỉ mặc định
                        </label>

                        <div className={styles.formActions}>
                            <button
                                type="button"
                                className={styles.btnCancel}
                                onClick={() => {
                                    setShowForm(false);
                                    setError("");
                                }}
                                disabled={isSubmitting}
                            >
                                Hủy
                            </button>
                            <button type="submit" className={styles.btnSave} disabled={isSubmitting}>
                                {isSubmitting ? "Đang lưu..." : "Lưu địa chỉ"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
};

export default ProfileAddresses;
