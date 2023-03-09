import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //🌮remove user from storage / local storage
    localStorage.removeItem('user');

    //🌮dispatch a logout action
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};
