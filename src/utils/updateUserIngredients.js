const updateUserIngredients = function (arr) {
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
  const newList = {
    vegetables: vegetables,
    meat: meat,
    fish: fish,
    spices: spices,
    misc: misc,
  };
  return newList;
};

export default updateUserIngredients;
