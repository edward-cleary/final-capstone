import React from "react";
import {
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
  MenuItem,
} from "@mui/material";

const RecipeInfo = ({ info, setInfo }) => {
  return (
    <>
      <Stack direction="row" alignItems="flex-end" sx={{ mt: 4 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="servings-label">Servings</InputLabel>
            <Select
              labelId="servings-label"
              id="servings"
              value={info.servings}
              label="Servings"
              onChange={(e) => setInfo({ ...info, servings: e.target.value })}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mx: 3 }}>
          <OutlinedInput
            id="prepTime"
            value={info.prepTime}
            required
            placeholder="Prep time"
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setInfo({ ...info, prepTime: e.target.value });
              }
            }}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
          />
        </Box>
        <Box>
          <OutlinedInput
            id="cookTime"
            value={info.cookTime}
            required
            placeholder="Cook Time"
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setInfo({ ...info, cookTime: e.target.value });
              }
            }}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
          />
        </Box>
      </Stack>
    </>
  );
};

export default RecipeInfo;
