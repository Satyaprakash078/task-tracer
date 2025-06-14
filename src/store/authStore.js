import { create } from 'zustand';

const mockUsers = [
  { email: 'dev@abc.com', password: '1234', role: 'developer' },
  { email: 'manager@abc.com', password: '4321', role: 'manager' },
];

 
export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,

  login: (email, password, navigate) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      set({ user: found });
      localStorage.setItem('user', JSON.stringify(found));
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  },

  logout: (navigate) => {
    
    set({ user: null });
    localStorage.removeItem('user');
      navigate('/');
  }
}));
