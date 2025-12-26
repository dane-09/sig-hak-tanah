
import { MdDashboard, MdFastfood } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

export default function ListMenu() {
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${isActive ?
            "text-hijau bg-green-200 font-extrabold" :
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`
    return (
        <div id="sidebar-menu" className="mt-10">
            <ul id="menu-list" className="space-y-3">
                <li>
                    <NavLink
                        id="menu-1"
                        to="/"
                        className={menuClass}>
                        <MdDashboard className="mr-2 text-xl" />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        id="menu-2"
                        to="/MapView"
                        className={menuClass}>
                        <AiOutlineUnorderedList className="mr-2 text-xl" />
                        Map
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}