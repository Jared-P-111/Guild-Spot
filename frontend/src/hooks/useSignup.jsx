import { useAuthContext } from './useAuthContext';
import { useState } from 'react';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, userName) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, userName }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //🌮Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      //🌮Save Auth Context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
