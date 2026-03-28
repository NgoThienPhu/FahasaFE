import { LuBookMarked } from "react-icons/lu";

type BookPlaceholderIconProps = {
    size?: number;
    className?: string;
    strokeWidth?: number;
};

/**
 * Icon mặc định khi chưa có ảnh bìa (Lucide — nét gọn, dễ nhận diện).
 */
export function BookPlaceholderIcon({
    size = 24,
    className,
    strokeWidth = 1.65,
}: BookPlaceholderIconProps) {
    return <LuBookMarked size={size} strokeWidth={strokeWidth} className={className} aria-hidden />;
}
