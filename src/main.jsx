
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './components/Store/Store';
import { RouterProvider} from 'react-router-dom';
import router from "../src/Routes.jsx";

createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider> ,
)
