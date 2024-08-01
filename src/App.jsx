import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

import Ordaer, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

// a function where we define our routes , and as you can see every route is in an object , and NOTE that we chose to work with the new react router that way to enable data fetching useing react rouder , where as the old way in the "word wise app" can't use react router to fetch data.

// NOTE Error handling , each element when they throw an error it bubbles up to the parent and the error element catches it.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, // Error element in parent .
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // YOU FOUND THAT CONFUSING !
      // , the loader function is a function we defined in the Menu compnent and we are bascilly telling router to run that function witch fetchs data, while it iis rendering the compnant it self, look up you will see that we imprted (loader as menuLoader)

      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },

      { path: "/cart", element: <Cart /> },

      // When ever there is a form submition on this CreateOrder element the action down below will be fired .

      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },

      {
        path: "/order/:orderId",
        element: <Ordaer />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
