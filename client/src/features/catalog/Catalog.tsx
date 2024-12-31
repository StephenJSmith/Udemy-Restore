import { useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";

const Catalog = () => {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <>
      <ProductList products={data} />
    </>
  );
};

export default Catalog;
