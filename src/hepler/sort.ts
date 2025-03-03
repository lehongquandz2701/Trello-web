const mapOrder = <
  T extends Record<K, V>,
  K extends string | number | symbol,
  V
>(
  originalArray: T[],
  orderArray: V[],
  key: K
): T[] => {
  if (!originalArray || !orderArray || !key) return [];

  const clonedArray = [...originalArray];
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });

  return orderedArray;
};

export default mapOrder;
