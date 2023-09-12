import capitalizeAndAddSpaces from './capitalizeAndAddSpaces';
export function copyIngredientsList(order, list) {
  let copiedText = [];
  for (const key in order[list]) {
    if (order[list][key] === 0) continue;
    copiedText.push(`${capitalizeAndAddSpaces(key)}: ${order[list][key]}kg`);
  }
  copiedText = copiedText.join('\n');
  return navigator.clipboard.writeText(copiedText);
}
