import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'


const script = document.createElement("script")
script.src =`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_AUTOCOMPLETE_KEY}&callback=initAutocomplete&libraries=places&v=weekly`;
  script.async = true;
  script.defer = true;

  document.body.appendChild(script);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
