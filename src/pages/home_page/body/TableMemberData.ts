const TableMemberData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: "Ngô Thiên Phú",
    accountNumber: (212121212 + index).toString(),
    price: "0348191482"
}));

export default TableMemberData;