import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button, Group, Title, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import { ResourceProvider } from "../../context/ResourceContext.jsx";
import Products from "./Products.jsx";
import JoineryPagination from "../ui/JoineryPagination.jsx";
import JoineryFilters from "../ui/JoineryFilters.jsx";
import { getBucketImageUrl } from "../../utils/imageConfigs.js";
import { woodSpecies } from "../../utils/woodSpecies.js";
import JoinerySearch from "../ui/JoinerySearch.jsx";

const productCategories = {
  raw_materials: {
    title: "Raw Materials",
    description: "High-quality raw materials for your next creation.",
    imageUrl: getBucketImageUrl("raw-materials.jpeg"),
  },
  lumber: {
    title: "Slabs & Lumber",
    description: "Shaped by nature, ready for the workshop.",
    imageUrl: getBucketImageUrl("slabs-lumber.jpeg"),
  },
  finished_goods: {
    title: "Finished Goods",
    description: "Handcrafted furniture and decor, ready to enhance your space.",
    imageUrl: getBucketImageUrl("finished-goods.jpeg"),
  },
  slabs: {
    title: "Slabs",
    productableType: "Slab",
    description: "",
  },
  logs: {
    title: "Logs",
    productableType: "Log",
    description: "",
  },
  rough_lumber: {
    title: "Rough Lumber",
    productableType: "RoughLumber",
    description: "",
  },
  surfaced_lumber: {
    title: "Surfaced Lumber",
    productableType: "SurfacedLumber",
    description: "High-quality raw materials for your next creation.",
  },
  turning_blanks: {
    title: "Turning Blanks",
    productableType: "TurningBlank",
    description: "Shaped by nature, ready for the workshop.",
  },
  carving_stock: {
    title: "Carving Stock",
    productableType: "CarvingStock",
    description: "Handcrafted furniture and decor, ready to enhance your space.",
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
  const [filterDrawerOpened, { open, close }] = useDisclosure(false);

  return (
    <ResourceProvider initial={{ searchColumn: 'name', scopes: [{ name: 'in_stock' }] }}>
      {category.imageUrl && <header className="category-header">
        <img src={category.imageUrl} alt={category.title} className="category-hero"/>
        <div className="category-overlay">
          <p className="header-paragraph">{category.description}</p>
        </div>
      </header>}

      <div className="page">
        <Title order={1} fw={600}>{category.title}</Title>

        <Group hiddenFrom="sm" justify="end">
          <Button onClick={open} variant="subtle" color="black" className="margin" rightSection={<IconPlus size={16} />}>
            Add Filters
          </Button>
        </Group>

        <div className="flex to-right margin-bottom">
          <JoinerySearch searchLabel="products" />
        </div>

        <Group visibleFrom="sm" className="flex row align-bottom to-right">
          <JoineryFilters filterConfigs={filterConfigs} />
        </Group>

        <Products category={categorySlug} />

        <JoineryPagination resourceName="products" />
      </div>


      <Drawer opened={filterDrawerOpened} size="sm" onClose={close} position="right">
        <Stack>
          <JoineryFilters filterConfigs={filterConfigs} orientation="vertical" />
        </Stack>
      </Drawer>
    </ResourceProvider>
  );
}

export default ProductCategories;