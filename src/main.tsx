import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'

// third-party
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from 'react-auth-kit'

// project import
import { store } from './store';

import 'simplebar-react/dist/simplebar.min.css';

// apex-chart
import './assets/third-party/apex-chart.css';
import './assets/third-party/react-table.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider authType={'localstorage'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>,
)
