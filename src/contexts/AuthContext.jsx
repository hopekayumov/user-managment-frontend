import PropTypes from 'prop-types';
import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage('token', null);
  const [user, setUser] = useLocalStorage('user', null);
  const value = useMemo(() => ({ token, setToken, user, setUser }), [token, user, setToken, setUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === 'undefined') {
    throw new Error('You have to use useAuthContext inside AuthProvider');
  }
  return context;
};
