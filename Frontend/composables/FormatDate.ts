export const useFormatDate = (date: string) => {
  const parsedDate = new Date(date);

  const formattedDate = parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;

}
