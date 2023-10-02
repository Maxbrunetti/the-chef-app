export function convertArrayIntoKeyValue(ingredients) {
  const result = {};
  for (const key in ingredients) {
    const ingredientKey = ingredients[key];
    const keyValuePairs = {};
    ingredientKey.forEach(value => {
      keyValuePairs[value] = 0;
    });

    result[key] = keyValuePairs;
  }
  return result;
}
