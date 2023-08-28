function setIngredients(arr) {
  const vegetables = new Set();
  const meat = new Set();
  const fish = new Set();
  const spices = new Set();
  const misc = new Set();
  console.log('new item added');
  arr.recipes.map(recipe => {
    recipe.ingredients.forEach(ingredient => {
      switch (ingredient.list) {
        case 'vegetables':
          return vegetables.add(ingredient.ingredient);
        case 'meat':
          return meat.add(ingredient.ingredient);
        case 'fish':
          return fish.add(ingredient.ingredient);
        case 'spices':
          return spices.add(ingredient.ingredient);
        case 'misc':
          return misc.add(ingredient.ingredient);
        default:
          return '';
      }
    });
    return '';
  });
  return { vegetables, meat, fish, spices, misc };
}

export default setIngredients;
