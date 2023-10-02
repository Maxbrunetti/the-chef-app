const updateUserIngredients = function (arr) {
  if (!arr) {
    return;
  }
  const vegetables = new Set();
  const meat = new Set();
  const fish = new Set();
  const spices = new Set();
  const misc = new Set();
  arr.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const { list, ingredient: ingredientName } = ingredient;

      switch (list) {
        case 'vegetables':
          return vegetables.add(ingredientName);
        case 'meat':
          return meat.add(ingredientName);
        case 'fish':
          return fish.add(ingredientName);
        case 'spices':
          return spices.add(ingredientName);
        case 'misc':
          return misc.add(ingredientName);
        default:
          return '';
      }
    });
  });
  function sortIngredients(array) {
    const sortedArray = [...array];
    sortedArray.sort((a, b) => (a < b ? -1 : 1));
    return sortedArray;
  }
  const newList = {
    vegetables: sortIngredients(vegetables),
    meat: sortIngredients(meat),
    fish: sortIngredients(fish),
    spices: sortIngredients(spices),
    misc: sortIngredients(misc),
  };
  return newList;
};

export default updateUserIngredients;
