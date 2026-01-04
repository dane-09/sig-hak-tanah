import { Outlet } from "react-router-dom"
import TopBar from "../components/auth/topbar"

export default function GuestLayout() {

    return(
      
        <div id="main-content" className="flex-1 p-4">
              <TopBar />
             <Outlet/>
        </div>
  
    )
}