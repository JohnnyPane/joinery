export const statusColors = (status) => {
  switch (status) {
    case 'pending':
    case 'offered':
      return 'yellow';
    case 'completed':
      return 'green';
    case 'awaiting_pickup':
    case 'awaiting_fulfillment':
      return 'orange';
    case 'failed':
    case 'declined':
      return 'red';
    case 'shipped':
    case 'requested':
    case 'open':
      return 'blue';
    case 'responded':
      return 'violet';
    case 'delivered':
      return 'indigo';
    case 'accepted':
      return 'green';
    default:
      return 'gray';
  }
}