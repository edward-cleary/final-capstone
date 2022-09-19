import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack, Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CategoryTabSelect from "../../../shared/CategoryTabSelect";
import { setAllRecipes } from "../../../../redux/features/recipes/recipesDataSlice";
import {
  setErrorMsg,
  setShowError,
} from "../../../../redux/features/forms/errors/errorsSlice";

const RecipesList = () => {
  const token = useSelector((state) => state.auth.token);
  const [recipesToDisplay, setRecipesToDisplay] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(setAllRecipes(res.data)))
      .catch((err) => {
        dispatch(setErrorMsg(err.message));
        dispatch(setShowError(true));
      });
  }, [dispatch, token]);

  return (
    <>
      <Typography variant="h4">Add a Meal Recipe</Typography>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <CategoryTabSelect
          isMealRecipes={true}
          setRecipesToDisplay={setRecipesToDisplay}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Stack
          sx={{ justifyContent: "space-evenly" }}
          direction="row"
          flexWrap="wrap"
        >
          {recipesToDisplay}
        </Stack>
      </Box>
    </>
  );
};

export default RecipesList;
