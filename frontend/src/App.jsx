import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true); // state to control the visibility of the Sidebar
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default App;
