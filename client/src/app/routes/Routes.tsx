import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '', element: <HomePage />},
      {path: '/catalog', element: <Catalog />},
      {path: '/catalog/:id', element: <ProductDetails />},
      {path: '/about', element: <AboutPage />},
      {path: '/contact', element: <ContactPage />},
    ],
  },

], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersists: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
});

const Routes = () => {
  return (
    <div>Routes</div>
  )
}

export default Routes;
