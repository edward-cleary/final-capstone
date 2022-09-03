import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';

export default function Features() {
  return (
    <Grid container space={3}>
      
    <Card className= "Features" sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
          alt="Meal Plan"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Meal Planning
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Make and Share Meal Plans
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
 
    <Card className= "Features" sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1492&q=80"
          alt="Recipe Book"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Recipes
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Save, Edit, and Share Recipes
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card className= "Features" sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image="https://images.unsplash.com/photo-1623265300797-4a3541e29a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Shopping List"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Shopping List
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Create your shopping list with a single click and share it.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
  );
}