import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import DeveloperTaskSection from '../components/DevloperTaskSection';
import ManagerDashboard from '../components/ManagerDashboard';

function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate=useNavigate()

  

  return (
    <div className="p-6 space-y-6">
       <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <div>
             <span className="mr-4 text-gray-600">Logged in as: <strong>{user.role}</strong></span>
             <button
                onClick={() => {
                  logout(navigate);
                  
                }}
                
                className="bg-red-500 text-white px-4 py-2 rounded"
              >Logout
              </button>
          </div>
       </div>
          
          {user.role ==='developer'? (
             <DeveloperTaskSection/>
          ): (
             <ManagerDashboard/>
          )}
    </div>
  );
}

export default Dashboard;
