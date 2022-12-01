import { RuteoHome } from "../utilities/routes/RuteoHome"
import { Header } from "./Header"
import { SideBar } from "./SideBar"

export const MainBoard = () => {
    return(
        <div id="main" className="main">
            <Header/>
            <SideBar/>
            <RuteoHome />
        </div>
    )
}