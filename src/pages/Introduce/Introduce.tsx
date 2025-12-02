import React from "react";
import styles from "./Introduce.module.css";
import { NavLink } from "react-router-dom";

const features = [
    {
        id: "vision",
        title: "Tầm nhìn",
        text: "Trở thành điểm đến tin cậy cho người yêu sách, mang tri thức tới mọi miền.",
        icon: "📘",
    },
    {
        id: "mission",
        title: "Sứ mệnh",
        text: "Cung cấp sách chất lượng, tổ chức sự kiện và hỗ trợ văn hoá đọc trong cộng đồng.",
        icon: "🎯",
    },
    {
        id: "team",
        title: "Đội ngũ",
        text: "Những biên tập viên, đóng gói và chuyên gia tận tâm - cùng bạn nuôi dưỡng thói quen đọc.",
        icon: "🤝",
    },
];

const Introduce: React.FC = () => {
    return (
        <div className={styles.introduceContainer}>
            <div className={`${styles.introduceHero} container`}>
                <div className={styles.heroGrid}>
                    <div className={styles.heroText}>
                        <h1 className={styles.introduceTitle}>Fahasa — Nơi sách kết nối cuộc sống</h1>
                        <p className={styles.introduceSubtitle}>
                            Chúng tôi tin rằng sách thay đổi cuộc đời. Từ những trang sách nhỏ, đến những ý tưởng lớn,
                            Fahasa đồng hành cùng hành trình học hỏi và trải nghiệm của bạn.
                        </p>
                        <div className={styles.introduceActions}>
                            <NavLink className={`${styles.btn} ${styles.primary}`} to={"/products"}>Khám phá sách</NavLink>
                            <NavLink className={styles.btn} to={"/introduce"}>Tìm hiểu thêm</NavLink>
                        </div>
                    </div>

                    <div className={styles.heroIllustration} aria-hidden>
                        <div className={styles.illusStack}>
                            <div className={`${styles.illusBook} ${styles.large}`}>📚</div>
                            <div className={styles.illusAccent} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.introduceContent}`}>
                {features.map((f) => (
                    <div key={f.id} className={styles.featureCard}>
                        <div className={styles.featureIcon} aria-hidden>{f.icon}</div>
                        <h3 className={styles.featureTitle}>{f.title}</h3>
                        <p className={styles.featureText}>{f.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Introduce;