import { Text, Title, Group, Button, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react"
import JoineryScopes from "../ui/JoineryScopes.jsx";
import JoineryFilters from "../ui/JoineryFilters.jsx";
import Products from "./Products.jsx";
import { ResourceProvider } from "../../context/ResourceContext.jsx";
import { woodSpecies } from "../../utils/woodSpecies.js";
import JoineryPagination from "../ui/JoineryPagination.jsx";
import JoinerySearch from "../ui/JoinerySearch.jsx";
import { productTypeOptions } from "../../utils/productConfigs.js";

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
    options: productTypeOptions
  }
]

const ProductsPage = () => {
  const [filtersOpened, { open, close }] = useDisclosure(false)

  return (
    <ResourceProvider initial={{ searchColumn: 'name' }} >
      <div className="page">
        <div>
          <Title order={1}>Shop Our Collection</Title>

          <div>
            <Text size="sm" className="hero-subtext">
              Browse raw slabs, lumber, and handcrafted pieces from independent sellers. Everything you need to build, create, and decorate.
            </Text>
          </div>
        </div>

        <div className="flex row to-right margin-top margin-bottom">
          <JoinerySearch searchLabel="our products" />
        </div>

        <Group hiddenFrom="sm" justify="end">
          <Button onClick={open} variant="subtle" color="black" className="margin" rightSection={<IconPlus size={16} />}>
            Add Filters
          </Button>
        </Group>

        <Group visibleFrom="sm" className="flex row align-bottom to-right">
          <JoineryScopes scopeConfigs={productTypeScopes} />
          <JoineryFilters filterConfigs={filterConfigs} />
        </Group>

        <Products />

        <JoineryPagination resourceName="products" />
      </div>

      <Drawer opened={filtersOpened} size="sm" onClose={close} position="right">
        <Stack>
          <JoineryFilters filterConfigs={filterConfigs} orientation="vertical" />
        </Stack>
      </Drawer>
    </ResourceProvider >
  )
}

export default ProductsPage;