import React from "react";
import styles from "./Introduce.module.css";
import { NavLink } from "react-router-dom";
import { FiBook, FiTarget, FiUsers } from "react-icons/fi";

const features = [
    {
        id: "vision",
        title: "Tầm nhìn",
        text: "Trở thành điểm đến tin cậy cho người yêu sách, mang tri thức tới mọi miền.",
        icon: FiBook,
    },
    {
        id: "mission",
        title: "Sứ mệnh",
        text: "Cung cấp sách chất lượng, tổ chức sự kiện và hỗ trợ văn hoá đọc trong cộng đồng.",
        icon: FiTarget,
    },
    {
        id: "team",
        title: "Đội ngũ",
        text: "Những biên tập viên, đóng gói và chuyên gia tận tâm — cùng bạn nuôi dưỡng thói quen đọc.",
        icon: FiUsers,
    },
];

const Introduce: React.FC = () => {
    return (
        <div className={styles.introduceContainer}>
            <section className={styles.hero}>
                <h1 id="intro-title" className={styles.heroTitle}>
                    <strong>Fahasa</strong> — Nơi sách kết nối cuộc sống
                </h1>
                <p className={styles.heroSubtitle}>
                    Chúng tôi tin rằng sách thay đổi cuộc đời. Fahasa đồng hành cùng hành trình đọc của bạn.
                </p>
                <div className={styles.heroActions}>
                    <NavLink className={styles.btnPrimary} to="/products">
                        Khám phá sách
                    </NavLink>
                    <NavLink className={styles.btnSecondary} to="/">
                        Về trang chủ
                    </NavLink>
                </div>
            </section>

            <div className={styles.features}>
                {features.map((f) => {
                    const Icon = f.icon;
                    return (
                        <article key={f.id} className={styles.featureCard}>
                            <div className={styles.featureIcon} aria-hidden>
                                <Icon />
                            </div>
                            <h3 className={styles.featureTitle}>{f.title}</h3>
                            <p className={styles.featureText}>{f.text}</p>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default Introduce;
