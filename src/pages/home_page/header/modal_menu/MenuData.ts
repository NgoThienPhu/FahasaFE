interface MenuDataType {
    menuName: string;
    subMenu: {
        subMenuName: string;
        subSubMenu: string[];
    }[];
}

const MenuData: MenuDataType[] = [
    {
        menuName: "Sách Trong Nước",
        subMenu: [
            {
                subMenuName: "Văn Học",
                subSubMenu: [
                    "Truyện Ngắn",
                    "Tiểu Thuyết - Tàn Văn",
                    "Light Novel",
                    "Ngôn Tình"
                ]
            },
            {
                subMenuName: "Kinh Tế",
                subSubMenu: [
                    "Nhân Vật - Bài Học Kinh Doanh",
                    "Quản Trị - Lãnh Đạo",
                    "Marketing - Lãnh Đạo",
                    "Phân Tích Kinh Tế"
                ]
            },
            {
                subMenuName: "Tâm Lý - Kỹ Năng Sống",
                subSubMenu: [
                    "Ký Năng Sống",
                    "Rèn Luyện Nhân Cách",
                    "Tâm Lý",
                    "Sách Cho Tuổi Mới Lớn"
                ]
            },
            {
                subMenuName: "Nuôi Dạy Con",
                subSubMenu: [
                    "Cẩm Nang Làm Mẹ",
                    "Phương Pháp Giáo Dục Trẻ Các Nước",
                    "Phát Triển Trí Tuệ Cho Trẻ",
                    "Phát Triển Kỹ Năng Cho Trẻ"
                ]
            },
            {
                subMenuName: "Sách Thiếu Nhi",
                subSubMenu: [
                    "Magana - Comic",
                    "Kiển Thức Bách Khoa",
                    "Tranh Sách Kỹ Năng Sống Cho Trẻ",
                    "Vừa Học Vừa Chơi Với Trẻ"
                ]
            },
            {
                subMenuName: "Tiểu Sử - Hồi Ký",
                subSubMenu: [
                    "Câu Truyện Cuộc Đời",
                    "Chính Trị",
                    "Kinh Tế",
                    "Nghệ Thuật - Giải Trí"
                ]
            },
            {
                subMenuName: "Giáo Khoa - Tham Khảo",
                subSubMenu: [
                    "Sách Giáo Khoa",
                    "Sách Tham Khảo",
                    "Luyện Thi THPT Quốc Gia",
                    "Mẫu Giáo"
                ]
            },
            {
                subMenuName: "Sách Học Ngoại Ngữ",
                subSubMenu: [
                    "Tiếng Anh",
                    "Tiếng Nhật",
                    "Tiếng Hoa",
                    "Tiếng Hàn"
                ]
            }
        ]
    },
    {
        menuName: "FOREIGN BOOKS",
        subMenu: [
            {
                subMenuName: "FICTION",
                subSubMenu: [
                    "Contemporary Fiction",
                    "Romance",
                    "Fantasy",
                    "Classics",
                ]
            },
            {
                subMenuName: "BUSINESS & MANAGEMENT",
                subSubMenu: [
                    "Business & Management",
                    "Economics",
                    "Finance & Accounting",
                ]
            },
            {
                subMenuName: "PERSONAL DEVELOPMENT",
                subSubMenu: [
                    "Popular Psychology",
                    "Advice On Careers & Achieving Success",
                    "Personal Finance",
                ]
            },
            {
                subMenuName: "CHILDREN'S BOOKS",
                subSubMenu: [
                    "Picture & Activity Books",
                    "Fiction (For Kids & Teen)",
                    "Education",
                    "Non-Fiction",
                ]
            },
            {
                subMenuName: "DICTIONARIES & LANGUAGES",
                subSubMenu: [
                    "ELT: Learning Material & Course",
                    "ELT: English For Specific Purposes",
                    "Dictionaries",
                ]
            },
            {
                subMenuName: "OTHER LANGUAGES",
                subSubMenu: [
                    "Japanese Books",
                    "German Books",
                    "French Books"
                ]
            },
            {
                subMenuName: "OTHER CATEGORIES",
                subSubMenu: [
                    "Biography",
                    "Society & Social Sciences",
                    "Science & Geography",
                    "Food & Drink",
                ]
            }
        ]
    },
    {
        menuName: "VPP - Dụng Cụ Học Sinh",
        subMenu: [
            {
                subMenuName: "BÚT - VIẾT",
                subSubMenu: [
                    "Bút Bi - Ruột Bút Bi",
                    "Bút Gel - Bút Nước",
                    "Bút Mực - Bút Máy",
                    "Bút Dạ Quang",
                    "Bút Chì - Ruột Bút Chì",
                ]
            },
            {
                subMenuName: "DỤNG CỤ HỌC SINH",
                subSubMenu: [
                    "Gôm - Tẩy",
                    "Gọt Bút Chì",
                    "Thước",
                    "Bóp Viết - Hộp Bút",
                    "Bộ Dụng Cụ Học Tập",
                ]
            },
            {
                subMenuName: "DỤNG CỤ VĂN PHÒNG",
                subSubMenu: [
                    "Bìa - File Hồ Sơ",
                    "Kẹp Giấy - Kẹp Bướm",
                    "Đồ Bấm Kim - Kim Bấm - Gỡ Kim",
                    "Cắm Bút - Bảng Tên",
                ]
            },
            {
                subMenuName: "DỤNG CỤ VẼ",
                subSubMenu: [
                    "Bút Vẽ",
                    "Màu Vẽ",
                    "Khay - Cọ Vẽ",
                    "Tập Vẽ - Giấy Vẽ",
                ]
            },
            {
                subMenuName: "SẢN PHẨM VỀ GIẤY",
                subSubMenu: [
                    "Tập - Vở",
                    "Sổ Tay Các Loại",
                    "Giấy Photo",
                    "Giấy Note",
                ]
            },
            {
                subMenuName: "SẢN PHẨM KHÁC",
                subSubMenu: [
                    "Dao Rọc Giấy - Lưỡi Dao Rọc",
                    "Băng Keo - Cắt Băng Keo",
                    "Bút Xóa Nước - Xóa Kéo",
                    "Hồ Dán",
                ]
            },
            {
                subMenuName: "SẢN PHẨM ĐIỆN TỬ",
                subSubMenu: [
                    "Máy Tính Điện Tử",
                ]
            }
        ]
    },
    {
        menuName: "Đồ Chơi",
        subMenu: [
            {
                subMenuName: "ĐỒ CHƠI NỔI BẬT",
                subSubMenu: [
                    "Xếp Hình - Lắp Ghép",
                    "Đồ Chơi Giáo Dục",
                    "Đồ Chơi Điều Khiển",
                    "Board Game",
                ]
            },
            {
                subMenuName: "ĐỒ CHƠI THEO PHIM",
                subSubMenu: [
                    "My Little Pony",
                    "Paw Patrol",
                    "Super Wings",
                    "Chiến Thần Vô Cực - NADO",
                ]
            },
            {
                subMenuName: "PHƯƠNG TIỆN CÁC LOẠI",
                subSubMenu: [
                    "Ô Tô",
                    "Máy Bay",
                    "Tàu Hỏa",
                    "Tàu Thủy",
                    "Phương Tiện Khác",
                ]
            },
            {
                subMenuName: "ĐỒ CHƠI KHÁC",
                subSubMenu: [
                    "Bột Nặn - Cát Nặn",
                    "Búp Bê",
                    "Thú Bông",
                    "Hướng Nghiệp Nhập Vai",
                ]
            },
            {
                subMenuName: "MÔ HÌNH CÁC LOẠI",
                subSubMenu: [
                    "Mô Hình Giấy",
                    "Mô Hình Gỗ",
                    "Mô Hình Nhân Vật",
                    "Mô Hình Động Vật",
                ]
            }
        ]
    },
    {
        menuName: "Làm Đẹp - Sức Khỏe",
        subMenu: [
            {
                subMenuName: "LÀM ĐẸP - SỨC KHỎE",
                subSubMenu: [
                    "Khẩu Trang Các Loại",
                    "Nước Rửa Tay - Xà Phòng",
                    "Băng Keo Cá Nhân",
                    "Khăn Giấy - Giấy Ướt",
                    "Chăm Sóc Cá Nhân Khác",
                    "Sản Phẩm Làm Đẹp",
                ]
            }
        ]
    },
    {
        menuName: "Hành Trang Đến Trường",
        subMenu: [
            {
                subMenuName: "SÁCH GIÁO KHOA",
                subSubMenu: [
                    "Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5",
                    "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9",
                    "Lớp 10", "Lớp 11", "Lớp 12",
                ]
            },
            {
                subMenuName: "SÁCH THAM KHẢO",
                subSubMenu: [
                    "Mẫu Giáo", "Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4",
                    "Lớp 5", "Lớp 6", "Lớp 7", "Lớp 8",
                    "Lớp 9", "Lớp 10", "Lớp 11",
                ]
            },
            {
                subMenuName: "LUYỆN THI THPTQG - LỚP 12",
                subSubMenu: [
                    "Luyện Thi Môn Toán", "Luyện Thi Môn Ngữ Văn", "Luyện Thi Môn Tiếng Anh",
                    "Luyện Thi Môn Vật Lý", "Luyện Thi Môn Hóa Học", "Luyện Thi Môn Sinh Học",
                    "Luyện Thi Môn Địa Lý", "Luyện Thi Môn Lịch Sử",
                ]
            },
            {
                subMenuName: "ĐỒ NGHỀ ĐẾN TRƯỜNG",
                subSubMenu: [
                    "Cặp, Ba Lô", "Máy Tính", "Bút Các Loại",
                    "Bóp Viết - Hộp Bút", "Tập Vở", "Bao Tập - Bao Sách",
                    "Mực", "Gôm - Tẩy", "Gọt Bút Chì",
                    "Compa", "Bảng Viết - Bông Lau Bảng", "Phấn - Hộp Đựng Phấn",
                ]
            }
        ]
    },
    {
        menuName: "Bách Hóa Online - Lưu Niệm",
        subMenu: [
            {
                subMenuName: "ĐỒ DÙNG CÁ NHÂN",
                subSubMenu: [
                    "Túi - Ví Thời Trang",
                    "Đồng Hồ",
                    "Phụ Kiện Du Lịch",
                    "Phụ Kiện Tóc",
                ]
            },
            {
                subMenuName: "LƯU NIỆM",
                subSubMenu: [
                    "Móc Khóa",
                    "Gương - Lược",
                    "Khung Hình",
                    "Tượng",
                    "Quà Tặng Trang Trí Khác",
                ]
            },
            {
                subMenuName: "ĐỒ ĐIỆN GIA DỤNG",
                subSubMenu: [
                    "Đèn Bàn",
                    "Đèn Ngủ",
                    "Đèn Pin",
                    "Pin & Dụng Cụ Sạc Pin",
                ]
            },
            {
                subMenuName: "SẢN PHẨM KHÁC",
                subSubMenu: [
                    "Thực Phẩm",
                    "Thiết Bị Số - Phụ Kiện Số",
                    "Quạt Các Loại",
                ]
            },
            {
                subMenuName: "NHÀ CỬA - ĐỜI SỐNG",
                subSubMenu: [
                    "Ly, Cốc, Bình Nước",
                    "Hộp Đựng Đồ Cá Nhân",
                    "Trang Trí Nhà Cửa",
                    "Sửa Chữa Nhà Cửa",
                ]
            },
            {
                subMenuName: "SẢN PHẨM ĐẶC BIỆT",
                subSubMenu: [
                    "SẢN PHẨM MỚI ❤️",
                    "SẢN PHẨM BÁN CHẠY ❤️"
                ]
            }
        ]
    }
]

export default MenuData;