import { useMe } from "../../hooks/useMe.js";
import ProductsPage from "../products/ProductsPage.jsx";


const Home = () => {
  const { data: user } = useMe();


  return (
    <ProductsPage />
  );
}

export default Home;