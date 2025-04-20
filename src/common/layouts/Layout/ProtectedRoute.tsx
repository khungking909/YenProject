import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserFromTokenQuery } from 'src/app/apis/authApi';
import { ScreenPath } from 'src/constants/screen';

const ProtectedRoute = () => {
  const { data: user, isLoading } = useGetUserFromTokenQuery();

  return user && !isLoading ? <Outlet /> : <Navigate to={ScreenPath.SIGN_IN} />;
};

export default ProtectedRoute;
