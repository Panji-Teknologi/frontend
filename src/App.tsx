import { useRoutes } from "react-router-dom";

import ThemeProvider from "./themes"
import ScrollTop from "./components/ScrollTop"
import routes from "./routes";

function App() {

  const Routes = useRoutes(routes(false));

  return (
    <ThemeProvider>
      <ScrollTop>
        {Routes}
      </ScrollTop>
    </ThemeProvider>
  )
}

export default App
