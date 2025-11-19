import QuoteCard from './QuoteCard.jsx'
import useResourceData from "../../hooks/useResourceData.js";
import ResponsiveList from "../ui/ResponsiveResourceList.jsx";

const quoteTableColumns = [
  { header: 'ID', accessor: 'id', type: 'text' },
  { header: 'Product', accessor: 'product.name', type: 'text' },
  { header: 'Quote Type', accessor: 'quote_type', type: 'text' },
  { header: 'Status', accessor: 'status', type: 'badge' },
  { header: 'Action Needed', accessor: 'requires_action', type: 'boolean' },
  { header: 'Message', accessor: 'latest_quote.message', type: 'text' },
  { header: 'Last Updated', accessor: 'latest_quote.updated_at', type: 'date' }
];

const QuotesTablePage = ({ onQuoteClick }) => {
  const { data: orders, total } = useResourceData('quote_requests');

  return (
    <ResponsiveList
      resources={orders}
      columns={quoteTableColumns}
      CardComponent={QuoteCard}
      total={total}
      onClick={onQuoteClick}
      resourceName="quote_requests"
    />
  )
}

export default QuotesTablePage;