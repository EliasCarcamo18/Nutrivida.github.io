import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};