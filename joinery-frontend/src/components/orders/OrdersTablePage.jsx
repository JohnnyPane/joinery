import OrderCard from './OrderCard.jsx';
import { orderShippingStatuses, shippingOptionDisplayNames } from "../../utils/shippingConfigs.js";
import useResourceData from "../../hooks/useResourceData.js";
import ResponsiveList from "../ui/ResponsiveResourceList.jsx";
import { orderStatusOptions } from "../../utils/orderUtils.js";

const orderItemTableColumns = [
  { header: 'Order ID', accessor: 'id', type: 'text' },
  { header: 'Product', accessor: 'product.name', type: 'text' },
  { header: 'Seller', accessor: 'store.name', type: 'text' },
  { header: 'Status', accessor: 'status', type: 'badge', textMapping: orderShippingStatuses },
  { header: 'Action Needed', accessor: 'requires_action', type: 'boolean' },
  { header: 'Shipping Method', accessor: 'shipping_option.shipping_type', type: 'text', textMapping: shippingOptionDisplayNames },
];

const OrdersTablePage = ({ onOrderClick }) => {
  const { data: orders, total } = useResourceData('order_items');

  const filterConfig = [
    {
      name: 'status',
      operator: 'eq',
      label: 'Status',
      options: orderStatusOptions
    },
  ]


  return (
    <ResponsiveList
      resources={orders}
      columns={orderItemTableColumns}
      CardComponent={OrderCard}
      total={total}
      onClick={onOrderClick}
      resourceName="order_items"
      filterConfigs={filterConfig}
    />
  )
}

export default OrdersTablePage;