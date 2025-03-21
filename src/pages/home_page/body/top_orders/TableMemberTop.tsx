import styles from './tableMemberTop.module.css';

interface Member {
    id: number,
    name: string,
    accountNumber: string,
    price: string
}

interface TableMemberTopProps {
    members: Member[];
}

const TableMemberTop: React.FC<TableMemberTopProps> = ({ members }) => {
    return (
        <table className={styles.table}>
            <tr>
                <th>Hạng</th>
                <th>Tên khách hàng</th>
                <th>Tài khoản</th>
                <th>Giá trị tích lũy</th>
            </tr>
            {
                members.map((member) => {
                    return (
                        <tr>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.accountNumber}</td>
                            <td>{member.price}</td>
                        </tr>
                    )
                })
            }
        </table>
    )
};

export default TableMemberTop;