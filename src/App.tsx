import {CursorMagnetic} from "./components/cursor-magnetic.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {Header} from "@/components/header.tsx";

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <div className="h-screen">
            <Header/>
            <CursorMagnetic/>
        </div>
        </ThemeProvider>

    )
}

export default App
