import { Toaster } from "../ui/toaster"
import NavBar from "../NavBar"
import UsersQuickView from "../home/UsersQuickView"
function HomePage(){
    return (
        <>
        <NavBar></NavBar>
            <main className="grid bg-red-400 ">
                <UsersQuickView/>
            </main>
    
            <Toaster/>
        </>
    )
}

export default HomePage