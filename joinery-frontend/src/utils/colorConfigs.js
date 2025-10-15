export const statusColors = (status) => {
  switch (status) {
    case 'pending':
    case 'offered':
      return 'yellow';
    case 'completed':
      return 'green';
    case 'failed':
    case 'declined':
      return 'red';
    case 'shipped':
    case 'requested':
    case 'open':
      return 'blue';
    case 'responded':
      return 'violet';
    case 'accepted':
      return 'green';
    default:
      return 'gray';
  }
}