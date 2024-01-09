
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth/auth';

export const AuthLayout = () => {
  const authToken = useAuthStore(state => state.token)
  
  const checkStatus = useAuthStore(state => state.checkStatus)

  if(authToken === "pending"){
    checkStatus()
    return <>Cargando...</>
  }

  if (authToken === "Authorized") {
    <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-indigo-700">
        <span className="text-white font-bold text-9xl">Zustand</span>
        {/* <img src="https://placehold.co/1440/667fff/ffffff.png?text=Zustand&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full" /> */}
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};