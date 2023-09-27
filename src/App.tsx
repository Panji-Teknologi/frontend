import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useIsAuthenticated } from "react-auth-kit";

import ThemeProvider from "./themes"
import ScrollTop from "./components/ScrollTop"
import routes from "./routes";

function App() {
  const isAuthenticated = useIsAuthenticated();
  const Routes = useRoutes(routes(isAuthenticated()));

  return (
    <ThemeProvider>
      <ScrollTop>
        {Routes}
      </ScrollTop>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
      />
    </ThemeProvider>
  )
}

export default App
