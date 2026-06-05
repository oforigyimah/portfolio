import {CursorMagnetic} from "./components/cursor-magnetic.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {Header} from "@/components/header.tsx";
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <div className="h-screen">
            <Header/>
            <CursorMagnetic/>
        </div>
        <SpeedInsights />
        </ThemeProvider>

    )
}

export default App
