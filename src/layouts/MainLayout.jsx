
import { Outlet } from "react-router-dom";

import Header from "../components/Header.jsx";
export default function MainLayout(){
    return(
        <div id="layout-wrapper" className="flex flex-row flex-1">
        
        <div id="main-content" className="flex-1 p-4">
              <Header />
             <Outlet/>
        </div>
    </div>
    )
}