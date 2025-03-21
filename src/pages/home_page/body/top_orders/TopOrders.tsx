import Line from '../../../../conponents/Line';
import TableMemberData from '../TableMemberData';
import TableMemberTop from './TableMemberTop';
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
                            {
                                TableMemberData.slice(0, 3).map((member) => {
                                    return (
                                        <div className={styles.topMember}>
                                            <div className={styles.topMemberImage}>
                                                {
                                                    member.id === 2 && <img src='https://cdn1.fahasa.com/media/event/default/xephang_2_1.png' alt='img-top-member' />
                                                }
                                                {
                                                    member.id === 1 && <img src='https://cdn1.fahasa.com/media/event/default/xephang_1_1.png' alt='img-top-member' />
                                                }
                                                {
                                                    member.id === 3 && <img src='https://cdn1.fahasa.com/media/event/default/xephang_3_1.png' alt='img-top-member' />
                                                }
                                            </div>
                                            <p className={styles.topMemberName}>{member.name}</p>
                                            <p className={styles.topMemberAccount}>{`Tài khoản ${member.accountNumber}`}</p>
                                            <p className={styles.topMemberPaied}>{member.price}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.footer}></div>
                    </div>
                    <div className={styles.bodyRight}>
                        <div className={styles.header}>
                            <p className={styles.lable}>Bảng Xếp Hạng</p>
                            <p className={styles.timeUpdate}>Cập Nhật Lúc 18:01 20/03</p>
                        </div>
                        <div className={styles.body}>
                            <TableMemberTop members={TableMemberData.slice(3, 99)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopOrders;