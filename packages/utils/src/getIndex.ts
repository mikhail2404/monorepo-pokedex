export const getIndex = (url: string) => {
  const match = url.match(/\/(\d+)\//);

  return match ? match[1] : null;
};
