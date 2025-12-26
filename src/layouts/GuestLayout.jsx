import { Outlet } from "react-router-dom"
import Header from "../components/Guest/Header"
export default function GuestLayout() {

    return(
      
        <div id="main-content" className="flex-1 p-4">
              <Header />
             <Outlet/>
        </div>
  
    )
}