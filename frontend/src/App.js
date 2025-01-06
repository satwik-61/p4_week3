import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; // Added Outlet
import Navbar from "./Components/Navbar/Navbar"; 
import Footer from "./Components/Footer/Footer"; 
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import LoginSignup from "./Pages/LoginSignup"; 
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import Admin from "./Pages/Admin";

export const backend_url = 'http://localhost:3000';
export const currency = '₹';
// Layout component to include Navbar and Footer
const Layout = () => {
    return (
        <>
            <Navbar /> {/* Static Navbar */}
            <main>
                <Outlet /> {/* Render current route's component */}
            </main>
            <Footer /> {/* Static Footer */}
        </>
    );
};

// Define routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, 
        children: [
            { path: '/', element: <Shop /> },
            { path: '/mens', element: <ShopCategory banner={men_banner} category="men" /> },
            { path: '/womens', element: <ShopCategory banner={women_banner} category="women" /> },
            { path: '/kids', element: <ShopCategory banner={kid_banner} category="kid" /> },
            { path: '/product/:productId', element: <Product /> },
            { path: '/cart', element: <Cart /> },
            { path: '/wishlist', element: <Wishlist /> }, 
            { path: '/login', element: <LoginSignup /> }, 
            { path: '/Admin', element: <Admin/> },
        ],
    },
], {
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
    },
});

// App component
function App() {
    return (
      <RouterProvider router={router} />
    );
}

export default App;