// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // zustand auth store

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
