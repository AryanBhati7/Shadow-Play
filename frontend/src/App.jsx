import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true); // state to control the visibility of the Sidebar
  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <Header />
      <main className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        {showSidebar && <Sidebar />}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
