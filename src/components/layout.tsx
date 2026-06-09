import SideBar from "./side-bar"
import TopBar from "./top-bar"
import { PageProvider } from "../context/PageContext"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PageProvider>
            <div className="flex w-full h-full">

                <SideBar />
                <div className="flex flex-col h-full w-full">
                    <TopBar />
                    <main className="flex-1 w-full bg-white overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </PageProvider>
    )
}

export default Layout
