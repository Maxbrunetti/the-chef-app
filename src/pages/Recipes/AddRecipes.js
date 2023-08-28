import './../../styles/Recipes.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';

function AddRecipes({ user, setUser }) {
  const [recipeForm, setRecipeForm] = useState({
    name: '',
    portions: '',
    ingredients: [{ ingredient: '', weight: '', list: '' }],
    alergens: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    setUser({
      ...user,
      recipes: [...user.recipes, recipeForm],
    });
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     localStorage.setItem('user', JSON.stringify(recipeForm));
    //     alert(JSON.stringify(values, null, 2));
    //     resolve();
    //   }, 1000);
    // });
  }

  function addIngredient() {
    setRecipeForm({
      ...recipeForm,
      ingredients: [
        ...recipeForm.ingredients,
        { ingredient: '', weight: '', list: '' },
      ],
    });
  }
  function newIngredientInput() {
    return recipeForm.ingredients.map((ing, i) => (
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
          value={recipeForm.ingredients[i].list}
          onChange={e => {
            const newIngredients = [...recipeForm.ingredients];
            newIngredients[i] = {
              ...newIngredients[i],
              list: e.target.value,
            };
            setRecipeForm({ ...recipeForm, ingredients: newIngredients });
          }}
        >
          <option value="vegetables">Vegetables</option>
          <option value="meat">Meat</option>
          <option value="fish">Fish</option>
          <option value="spices">Spices</option>
          <option value="misc">Misc</option>
        </Select>
      </FormControl>
    ));
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
      {newIngredientInput()}
      <Button
        onClick={() => {
          addIngredient();
          console.log(recipeForm);
        }}
        className="btn"
        style={{ margin: 0 }}
      >
        + Ingredient
      </Button>
      <div className="btn-container">
        <Button
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          className="btn btnRecipe"
          // onClick={() => console.log(recipeForm)}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddRecipes;
