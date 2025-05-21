import { NavLink } from "react-router-dom";
import "../../styles/components/navigation/Sidebar.css";
import { RiDashboardFill } from "react-icons/ri";
import { MdChairAlt } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end>
              <span className="nav-icon">
                <RiDashboardFill size={20} />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tables">
              <span className="nav-icon">
                <MdChairAlt size={20} />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders">
              <span className="nav-icon">
                <FaBook size={20} />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/order-menu">
              <span className="nav-icon">
                <IoIosStats size={20} />
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
