export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString('default', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
