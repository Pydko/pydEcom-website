import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


//THE APP RUN FROM HERE
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)