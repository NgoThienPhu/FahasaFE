import Line from '../../../conponents/Line';
import styles from './topOrder.module.css';

const TopOrders: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topOrders}>
                <div className={styles.header}>
                    <p>Bảng xếp hạng đua top đơn hàng</p>
                </div>
                <Line height={2} padding={0} />
                <div className={styles.body}>
                    <div className={styles.bodyLeft}>
                        <div className={styles.header}>
                            <div className={styles.topMember}>
                                <div className={styles.topMemberImage}>
                                    <img src='https://cdn1.fahasa.com/media/event/default/xephang_2_1.png' alt='img-top-member' />
                                </div>
                                <p className={styles.topMemberName}>Hoàng Huy Kim</p>
                                <p className={styles.topMemberAccount}>Tài khoản 32123123</p>
                                <p className={styles.topMemberPaied}>2.000.000</p>
                            </div>
                            <div className={styles.topMember}>
                                <div className={styles.topMemberImage}>
                                    <img src='https://cdn1.fahasa.com/media/event/default/xephang_1_1.png' alt='img-top-member' />
                                </div>
                                <p className={styles.topMemberName}>Hoàng Huy Kim</p>
                                <p className={styles.topMemberAccount}>Tài khoản 32321233</p>
                                <p className={styles.topMemberPaied}>2.000.000</p>
                            </div>
                            <div className={styles.topMember}>
                                <div className={styles.topMemberImage}>
                                    <img src='https://cdn1.fahasa.com/media/event/default/xephang_3_1.png' alt='img-top-member' />
                                </div>
                                <p className={styles.topMemberName}>Hoàng Huy Kim</p>
                                <p className={styles.topMemberAccount}>Tài khoản 32323123</p>
                                <p className={styles.topMemberPaied}>2.000.000</p>
                            </div>
                        </div>
                        <div className={styles.footer}></div>
                    </div>
                    <div className={styles.bodyRight}>
                        <div className={styles.header}>
                            <p className={styles.lable}>Bảng Xếp Hạng</p>
                            <p className={styles.timeUpdate}>Cập Nhật Lúc 18:01 20/03</p>
                        </div>
                        <div className={styles.body}>
                            <table>
                                <tr>
                                    <th>Hạng</th>
                                    <th>Tên khách hàng</th>
                                    <th>Tài khoản</th>
                                    <th>Giá trị tích lũy</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ngô Thiên Phú</td>
                                    <td>342832983</td>
                                    <td>12.000.000</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopOrders;