import { createBrowserRouter } from "react-router-dom";
import Root from './Root';
import App from "./App";
import ProductDetails from "./components/ProductDetails/ProductDetails";

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
            }

            
            ]
    }
            ])

export default router;