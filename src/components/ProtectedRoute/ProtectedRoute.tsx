import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    requireAuth?: boolean; // when true, block guests; when false (default), block signed-in users
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    redirectTo = '/',
    requireAuth = false
}) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Đang kiểm tra...</div>;
    }

    // Guest-only guard (for login/register): if signed in, redirect
    if (!requireAuth && isAuthenticated) {
        console.log('vao 1')
        return <Navigate to={redirectTo} replace />;
    }

    // Auth-only guard (for profile): if not signed in, go to login
    if (requireAuth && !isAuthenticated) {
        console.log('vao 2')
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
