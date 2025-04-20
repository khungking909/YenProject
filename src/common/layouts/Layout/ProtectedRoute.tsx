import { Loading } from '@components/Organism/Loading';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserFromTokenQuery } from 'src/app/apis/authApi';
import { ScreenPath } from 'src/constants/screen';

const ProtectedRouteContent = () => {
  const { data: user, isLoading, isFetching, error } = useGetUserFromTokenQuery();

  if (isLoading || isFetching) {
    return <Loading loadingType="circle" />;
  }

  if (error) {
    return <Navigate to={ScreenPath.SIGN_IN} />;
  }

  return user ? <Outlet /> : <Navigate to={ScreenPath.SIGN_IN} />;
};

const ProtectedRoute = () => (
  <Suspense fallback={<Loading loadingType="circle" />}>
    <ProtectedRouteContent />
  </Suspense>
);

export default ProtectedRoute;
