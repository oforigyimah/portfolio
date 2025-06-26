import {CursorMagnetic} from "./components/cursor-magnetic.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {Header} from "@/components/header.tsx";
import {StaggeredGrid} from "@/components/staggered-grid.tsx";

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <CursorMagnetic/>
            <div className="min-h-screen">
                {/*Staggered grid animation*/}
                <Header/>
                <StaggeredGrid/>
            </div>
        </ThemeProvider>

    )
}

export default App
