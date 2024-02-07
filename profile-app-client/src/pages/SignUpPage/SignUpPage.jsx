import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = 'http://localhost:5005';

const SignUpPage = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    campus: '',
    course: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formState);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="campus">Campus</label>
          <input type="text" id="campus" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="course">Course</label>
          <input type="text" id="course" onChange={handleChange} />
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
