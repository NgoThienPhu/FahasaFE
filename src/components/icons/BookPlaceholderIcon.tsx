import { LuBookMarked } from "react-icons/lu";

type BookPlaceholderIconProps = {
    size?: number;
    className?: string;
    strokeWidth?: number;
};

export function BookPlaceholderIcon({
    size = 24,
    className,
    strokeWidth = 1.65,
}: BookPlaceholderIconProps) {
    return <LuBookMarked size={size} strokeWidth={strokeWidth} className={className} aria-hidden />;
}
