"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getToken, isTokenValid } from '../utils/auth';
import { loginSuccess } from './authSlice';

const withAuth = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      const token = getToken();
      if (!token || (token && !isTokenValid(token))) {
        router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`); 
      } 
      if(token && !isAuthenticated){
        dispatch(loginSuccess(token));
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  EnhancedComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return EnhancedComponent;
};

export default withAuth;
