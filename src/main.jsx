import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import the Provider from react-redux
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './style.css';
import store from './store/store.jsx';
import RoutesComponent from './Routes.jsx';


// Wrap your entire app with the <Provider> component and pass the store
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      <BrowserRouter>  {/* Wrap RoutesComponent with BrowserRouter */}
        <RoutesComponent /> 
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
