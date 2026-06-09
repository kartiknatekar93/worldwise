import AppNav from "./AppNav";
import Logo from "./Logo";
import Styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={Styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={Styles.footer}>
        &copy; {new Date().getFullYear()} WorldWise. All rights reserved.
      </footer>
    </div>
  );
}

export default Sidebar;
