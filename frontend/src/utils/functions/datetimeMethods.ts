export function formatDateTime(date: Date) {
  return `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR')}`.replace(':', 'h').split(':')[0];
}