function VNDCurrencyFormatting(price: number): string {
    return price.toLocaleString('vi-VN') + ' đ';
}

export { VNDCurrencyFormatting }