import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    requireAuth?: boolean;
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

    if (!requireAuth && isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
