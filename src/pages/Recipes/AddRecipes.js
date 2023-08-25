import { useState } from 'react';
import './../../styles/Recipes.css';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';

function AddRecipes() {
  const initialIngredients = Array.from({ length: 20 }, () => ({
    ingredient: '',
    quantity: '',
    list: '',
  }));

  const [recipeForm, setRecipeForm] = useState({
    name: '',
    portions: '',
    ingredients: initialIngredients,
    alergens: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 1000);
    });
  }

  function newIngredientInput(quantity) {
    let ingredient = [];
    for (let i = 0; i < quantity; i++) {
      ingredient.push(
        <FormControl
          className="formGroup ingredientInput"
          key={'ingredient ' + i}
        >
          <Input
            gridArea={'ingredient'}
            placeholder="Ingredient "
            value={recipeForm.ingredients[i].ingredient}
            onChange={e => {
              const newIngredients = [...recipeForm.ingredients];
              newIngredients[i] = {
                ...newIngredients[i],
                ingredient: e.target.value,
              };
              setRecipeForm({ ...recipeForm, ingredients: newIngredients });
            }}
          />
          <Input
            gridArea={'weight'}
            placeholder="Kg"
            type="number"
            value={recipeForm.ingredients[i].weight}
            onChange={e => {
              const newIngredients = [...recipeForm.ingredients];
              newIngredients[i] = {
                ...newIngredients[i],
                weight: e.target.value,
              };
              setRecipeForm({ ...recipeForm, ingredients: newIngredients });
            }}
          />
          <Select
            gridArea={'type'}
            placeholder="Type"
            value={recipeForm.ingredients[i].type}
            onChange={e => {
              const newIngredients = [...recipeForm.ingredients];
              newIngredients[i] = {
                ...newIngredients[i],
                type: e.target.value,
              };
              setRecipeForm({ ...recipeForm, ingredients: newIngredients });
            }}
          >
            <option value="vegetables">Vegetables</option>
            <option value="meat">Meat</option>
            <option value="fish">Fish</option>
            <option value="spices">Spices</option>
          </Select>
        </FormControl>
      );
    }
    return ingredient;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="addRecipeForm">
      <FormControl isInvalid={errors.recipeName} className="formGroup">
        <FormLabel htmlFor="recipeName">Recipe Name</FormLabel>
        <Input
          id="recipeName"
          {...register('recipeName', {
            required: 'Unique recipe name required',
            minLength: { value: 3, message: 'Minimum length should be 3' },
          })}
          value={recipeForm.name}
          onChange={e => setRecipeForm({ ...recipeForm, name: e.target.value })}
        />
        <FormErrorMessage className="errorMessage">
          {errors.recipeName && errors.recipeName.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.portions} className="formGroup">
        <FormLabel htmlFor="portions">Portions</FormLabel>
        <Input
          id="portions"
          type="number"
          {...register('portions', {
            required: 'Add recipe portions',
            min: { value: 1, message: 'Minimum value is 1' },
          })}
          value={recipeForm.portions}
          onChange={e =>
            setRecipeForm({ ...recipeForm, portions: e.target.value })
          }
        />
        <FormErrorMessage className="errorMessage">
          {errors.portions && errors.portions.message}
        </FormErrorMessage>
      </FormControl>
      <p>Ingredients</p>
      {newIngredientInput(20)}

      <Button mt={4} isLoading={isSubmitting} type="submit" className="btn">
        Submit
      </Button>
    </form>
  );
}

export default AddRecipes;
