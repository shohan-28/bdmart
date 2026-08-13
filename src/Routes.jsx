import { createBrowserRouter } from "react-router-dom";
import Root from './Root';
import App from "./App";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Services from "./components/Services/Services";
import CartPage from "./components/CartPage/CartPage";
import Checkout from './components/CheckOut/CheckOut';
import SideCart from './components/SideCart/SideCart';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
            children:[
            {
                path: "/",
            element: <App></App>
                },

            {
                path: "/ProductDetails/:productId",
                loader: ({params}) => {
                    return fetch('/ProductData.json')
                        .then(response => response.json())     
                        .then(Data => (
                            Data.find(b => parseInt(b.id) === parseInt(params.productId))
            ))
                },
            Component: ProductDetails,
            },

            {
                path: "/About",
            element: <About></About>
                },

                {
                path: "/Contact",
            element: <Contact></Contact>
                },

                {
                path: "/Services",
            element: <Services></Services>
                },

                {
                path: "/CartPage",
            element: <CartPage></CartPage>
                },

                {
                path: "/Checkout",
            element: <Checkout></Checkout>
                },

                {
                path: "/SideCart",
            element: <SideCart></SideCart>
                }



            
            ]
    }
            ])

export default router;