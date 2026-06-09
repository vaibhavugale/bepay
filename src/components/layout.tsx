import SideBar from "./side-bar"
import TopBar from "./top-bar"
import { PageProvider } from "../context/PageContext"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PageProvider>
            <div className="flex min-w-[100dvw] h-[100dvh]">

                <SideBar />
                <div className="flex flex-col h-full w-full pr-8">
                    <TopBar />
                    <main className="h-full w-full bg-white rounded-t-2xl overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </PageProvider>
    )
}

export default Layout
