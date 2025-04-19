import './i18n.ts';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { useGetUserFromTokenQuery } from 'src/app/apis/authApi';
import router from 'src/app/routes/Router';
import { setUser } from 'src/app/slices/authSlice/authSlice';

const AppComponent = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetUserFromTokenQuery();

  useEffect(() => {
    if (isSuccess && data.user) {
      dispatch(setUser(data.user));
    }
  }, [isSuccess, dispatch, data]);

  return <RouterProvider router={router} />;
};

const App = memo(AppComponent);

export default App;
