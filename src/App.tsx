import {BrowserRouter, Route, Routes} from "react-router-dom"
import {CursorMagnetic} from "./components/cursor-magnetic.tsx"
import {ThemeProvider} from "@/components/theme-provider.tsx"
import {Header} from "@/components/header.tsx"
import {Footer} from "@/components/footer.tsx"
import {HomePage} from "@/pages/home.tsx"
import {ServicesPage} from "@/pages/services.tsx"
import {ResumePage} from "@/pages/resume.tsx"
import {WorkPage} from "@/pages/work.tsx"
import {ContactPage} from "@/pages/contact.tsx"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <BrowserRouter>
        <CursorMagnetic>
          <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CursorMagnetic>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
