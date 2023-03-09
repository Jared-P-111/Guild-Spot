import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const { signup, error, isLoading } = useSignup();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, userName);

    if (!error) {
      navigate('/userPage');
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>User Name: </label>
      <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
      <label>Email: </label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Password: </label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button type="submit" disabled={isLoading}>
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
