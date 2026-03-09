import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner";
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster 
          position="top-right" 
          richColors 
          closeButton 
          toastOptions={{
            style: { zIndex: 9999 },
            className: "z-[9999]"
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
