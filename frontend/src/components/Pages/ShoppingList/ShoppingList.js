import React, { useRef } from "react";
import { convertToMeasurement } from "../../../shared/conversions";
import { Stack, Typography, IconButton } from "@mui/material";
import { CheckBoxOutlineBlank, Print } from "@mui/icons-material/";
import ReactToPrint from "react-to-print";

const ShoppingList = ({ mealplan }) => {
  let shoppingListObj = {};

  // makes an object containing a key for each ingredient and value of its quantity in 1/8 teaspoons
  // takes into account the amount of servings for each meal
  if (mealplan) {
    for (let day of mealplan?.days) {
      for (let meal of day.meals) {
        for (let mealrecipe of meal.mealRecipes) {
          let servings = mealrecipe.servings;
          for (let recipeIngredient of mealrecipe.recipe.recipeIngredients) {
            const ingredient = recipeIngredient.name;
            if (shoppingListObj.hasOwnProperty(ingredient)) {
              shoppingListObj[ingredient] +=
                recipeIngredient.quantity * servings;
            } else {
              shoppingListObj[ingredient] =
                recipeIngredient.quantity * servings;
            }
          }
        }
      }
    }
  }

  // convert quantities to readable measurements using convertToMeasurement function
  if (shoppingListObj) {
    for (let key of Object.keys(shoppingListObj)) {
      shoppingListObj[key] = convertToMeasurement(shoppingListObj[key]);
    }
  }

  const Ingredient = ({ ingredient }) => {
    return (
      <Typography
        sx={{ mt: 3, display: "flex", alignItems: "center" }}
        element="h3"
      >
        <CheckBoxOutlineBlank sx={{ mr: 2 }} />
        <Typography
          sx={{ mr: 1, textTransform: "capitalize" }}
          variant="titleSmall"
        >
          {ingredient}:
        </Typography>
        <Typography>{shoppingListObj[ingredient]}</Typography>
      </Typography>
    );
  };

  const ingredientComponents = Object.keys(shoppingListObj).map(
    (ingredientName, index) => (
      <Ingredient key={index} ingredient={ingredientName} />
    )
  );

  const printComponent = useRef();

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          pt: 5,
        }}
        elevation={5}
        ref={printComponent}
      >
        <ReactToPrint
          content={() => printComponent.current}
          trigger={() => (
            <IconButton
              sx={{
                "@media print": {
                  display: "none",
                },
                cursor: "pointer",
              }}
            >
              <Print />
            </IconButton>
          )}
        />

        <Stack alignItems="center" sx={{ pb: 3 }}>
          <Typography
            textAlign="center"
            variant="h4"
            element="h1"
            sx={{ mb: 3, textTransform: "capitalize" }}
          >
            {`${mealplan?.title} Shopping List`}
          </Typography>
          <Stack>{ingredientComponents}</Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ShoppingList;
