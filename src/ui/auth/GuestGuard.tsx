// import { Navigate } from 'react-router-dom';
import { PropsWithChildren, useCallback, useState, useEffect } from 'react';
import { Modal } from '@gravity-ui/uikit';
import useAuth from './useAuth';
import { LoginForm } from './LoginForm/LoginForm';
import { RegisterForm } from './RegisterForm/RegisterForm';

export const GuestGuard = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  if (!isAuthenticated) {
    return (
        <Modal open={true}>
            {isLogin && <LoginForm onGoToSignUpClick={() => setIsLogin(false)}/>}
            {!isLogin && <RegisterForm onGoToLoginClick={() => setIsLogin(true)}/>}
        </Modal>
    );
  }

  return <>{children}</>;
};
