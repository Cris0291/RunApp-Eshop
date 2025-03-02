export default function formatDate(date: string) {
  let result = new Date(date);
  return result.toLocaleDateString();
}
