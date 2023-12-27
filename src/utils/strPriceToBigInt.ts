const strPriceToBigInt = (price: string, decimals: number = 18): string => {
  let formattedPrice = price;
  const [leftPart, rightPart] = formattedPrice.split(".");

  if (rightPart?.length) {
    if (rightPart.length < decimals) {
      formattedPrice = leftPart + rightPart.padEnd(decimals, "0");
    } else {
      formattedPrice = leftPart + rightPart.substring(0, decimals);
    }
  } else {
    formattedPrice = leftPart + "0".repeat(decimals);
  }

  return formattedPrice;
};

export default strPriceToBigInt;
