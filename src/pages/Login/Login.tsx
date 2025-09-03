import { Link } from 'react-router-dom';
import './Login.css'

const Login: React.FC = () => {
    return (
        <div className="login">
            <div className='login-container'>
                <form className="login-form">
                    <h1>Đăng nhập</h1>
                    <div className="login-form-group">
                        <label htmlFor="username">Tài khoản</label>
                        <input className='login-form-input' type="text" id="username" name="username" placeholder='Tên tài khoản...' />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input className='login-form-input' type="password" id="password" name="password" placeholder='Mật khẩu...' />
                    </div>
                    <div className="login-form-group">
                        <button className='login-form-submit' type="submit">Đăng nhập</button>
                    </div>
                    <div className='forgot-password'>
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </div>
                    <div className='register'>
                        <span>Bạn chưa có tài khoản <Link to="/register">đăng ký ngay</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;