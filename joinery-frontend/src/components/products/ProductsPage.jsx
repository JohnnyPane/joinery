import { Text, Title } from "@mantine/core";
import JoineryScopes from "../ui/JoineryScopes.jsx";
import JoineryFilters from "../ui/JoineryFilters.jsx";
import Products from "./Products.jsx";
import { ResourceProvider } from "../../context/ResourceContext.jsx";
import { woodSpecies } from "../../utils/woodSpecies.js";
import JoineryPagination from "../ui/JoineryPagination.jsx";

const productTypeScopes = [{
  type: 'buttons',
  options: [
    { label: 'All Products', value: 'all' },
    { label: 'Slabs', value: 'slabs' },
    { label: 'Logs', value: 'logs' },
  ]
}];

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
  {
    name: 'productable_type',
    operator: 'eq',
    label: 'Product Type',
    options: [
      { value: 'Slab', label: 'Slabs' },
      { value: 'Log', label: 'Logs' },
    ]
  }
]

const ProductsPage = () => {
  return (
    <ResourceProvider initial={{ scopes: [{ name: 'in_stock' }]}} >
      <div className="page">
        <div>
          <Title order={1}>Shop Our Collection</Title>

          <div>
            <Text size="sm" className="hero-subtext">
              Browse raw slabs, lumber, and handcrafted pieces from independent sellers. Everything you need to build, create, and decorate.
            </Text>
          </div>
        </div>

        <div className="flex row align-bottom to-right">
          <JoineryScopes scopeConfigs={productTypeScopes} />
          <JoineryFilters filterConfigs={filterConfigs} />
        </div>

        <Products />

        <JoineryPagination resourceName="products" />
      </div>
    </ResourceProvider >
  )
}

export default ProductsPage;