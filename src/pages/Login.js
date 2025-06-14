import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, navigate);
  };

    return(
         <div className="h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow-md w-80 space-y-4">
                <h2 className="text-xl font-bold flex justify-center">Login</h2>
                 <div>
                     <label>Email: </label>
                        <input 
                        type='email'
                        placeholder='enter email' 
                         className="w-full border px-3 py-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                 </div>
                     <div>
                     <label>Password: </label>
                        <input 
                        type='password'
                        placeholder='enter password'
                         className="w-full border px-3 py-2 rounded" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                 </div>
                   <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                        Login
                    </button>
            </form>
         </div>
    )
}
export default Login;