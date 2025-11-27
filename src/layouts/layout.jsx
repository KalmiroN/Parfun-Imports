import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-bg text-brand-text transition-colors duration-500">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
