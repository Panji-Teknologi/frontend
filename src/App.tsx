import { useRoutes } from "react-router-dom";

import ThemeProvider from "./themes"
import ScrollTop from "./components/ScrollTop"
import routes from "./routes";

function App() {

  const Routes = useRoutes(routes(true));

  return (
    <ThemeProvider>
      <ScrollTop>
        {Routes}
        {/* test pull */}
      </ScrollTop>
    </ThemeProvider>
  )
}

export default App
