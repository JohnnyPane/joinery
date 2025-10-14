import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Text, Title } from "@mantine/core";
import { ResourceProvider } from "../../context/ResourceContext.jsx";
import Products from "./Products.jsx";
import JoineryPagination from "../ui/JoineryPagination.jsx";
import {woodSpecies} from "../../utils/woodSpecies.js";
import JoineryFilters from "../ui/JoineryFilters.jsx";

const productCategories = {
  "raw_materials": {
    title: "Raw Materials",
    description: "High-quality raw materials for your next creation.",
    imageUrl: "https://joinery-assets.s3.us-east-1.amazonaws.com/raw-materials.jpeg",
  },
  "lumber": {
    title: "Slabs & Lumber",
    description: "Shaped by nature, ready for the workshop.",
    imageUrl: "https://joinery-assets.s3.us-east-1.amazonaws.com/slabs-lumber.jpeg",
  },
  "finished_goods": {
    title: "Finished Goods",
    description: "Handcrafted furniture and decor, ready to enhance your space.",
    imageUrl: "https://joinery-assets.s3.us-east-1.amazonaws.com/finished-goods.jpeg",
  }
}

const filterConfigs = [
  {
    name: 'price_in_cents',
    operator: 'between',
    label: 'Price',
    options: [
      { value: '0-10000', label: '$0 - $100' },
      { value: '10001-50000', label: '$101 - $500' },
      { value: '50001-100000', label: '$501 - $1000' },
      { value: '100001-500000', label: '$1001 - $5000' },
      { value: '500001-99999999', label: '$5001+' },
    ]
  },
  {
    name: 'productable.species',
    operator: 'eq',
    label: 'Species',
    searchable: true,
    options: woodSpecies
  },
]

const ProductCategories = () => {
  const { categorySlug } = useParams();
  const category = useMemo(() => productCategories[categorySlug], [categorySlug]);
  const categoryScope = { name: categorySlug };

  return (
    <ResourceProvider initial={{ scopes: [categoryScope, { name: 'in_stock' }] }}>
      <header className="category-header">
        <img src={category.imageUrl} alt={category.title} className="category-hero" />
        <div className="category-overlay">
          {/*<h1 className="header-title">{category.title}</h1>*/}
          <p className="header-paragraph">{category.description}</p>
        </div>
      </header>

      <div className="page">
        <Title order={1} fw={400}>{category.title}</Title>

        <div className="flex row to-right">
          <JoineryFilters filterConfigs={filterConfigs} />
        </div>

        <Products />

        <JoineryPagination resourceName="products" />
      </div>
    </ResourceProvider>
  );
}

export default ProductCategories;