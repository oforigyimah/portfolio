import {CursorMagnetic} from "./components/cursor-magnetic.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Header} from "@/components/header.tsx";
import {StaggeredGrid} from "@/components/staggered-grid.tsx";

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <div className="min-h-screen">
                {/*Staggered grid animation*/}
                {/*<StaggeredGrid/>*/}
                <Header/>
                <CursorMagnetic/>
                <Button variant="ghost">homepage</Button>
            </div>
        </ThemeProvider>

    )
}

export default App
