import ThemeProvider from "./themes"
import ScrollTop from "./components/ScrollTop"
import Routes from "./routes"

function App() {

  return (
    <ThemeProvider>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeProvider>
  )
}

export default App
