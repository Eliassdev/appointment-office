import { Outlet } from 'react-router';
import NavBar from '../components/NavBar/NavBar';

const Home = () => {
  return (
    <div className="h-screen w-full bg-slate-700">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Home;
