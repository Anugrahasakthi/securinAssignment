// import React from "react";
// import { Drawer, Typography, Divider, List, ListItem, ListItemText } from "@mui/material";

// const RecipeDrawer = ({ recipe, onClose }) => {
//   if (!recipe) return null;

//   return (
//     <Drawer anchor="right" open={Boolean(recipe)} onClose={onClose}>
//       <div style={{ width: 400, padding: "20px" }}>
//         <Typography variant="h6">{recipe.title}</Typography>
//         <Typography variant="subtitle1" color="textSecondary">
//           {recipe.cuisine}
//         </Typography>
//         <Divider style={{ margin: "10px 0" }} />

//         <Typography><b>Description:</b> {recipe.description}</Typography>
//         <Typography style={{ marginTop: "10px" }}>
//           <b>Total Time:</b> {recipe.total_time} min
//         </Typography>
//         <Typography><b>Prep Time:</b> {recipe.prep_time} min</Typography>
//         <Typography><b>Cook Time:</b> {recipe.cook_time} min</Typography>

//         <Divider style={{ margin: "10px 0" }} />
//         <Typography variant="h6">Nutrition</Typography>
//         <List>
//           {Object.entries(recipe.nutrients || {}).map(([key, value]) => (
//             <ListItem key={key}>
//               <ListItemText primary={`${key}: ${value}`} />
//             </ListItem>
//           ))}
//         </List>
//       </div>
//     </Drawer>
//   );
// };

// export default RecipeDrawer;

import React from "react";
import { Drawer, Typography, Divider, Table, TableBody, TableCell, TableRow } from "@mui/material";

export default function RecipeDrawer({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <Drawer anchor="right" open={!!recipe} onClose={onClose}>
      <div style={{ width: 400, padding: 20 }}>
        <Typography variant="h5">{recipe.title}</Typography>
        <Typography variant="subtitle1">{recipe.cuisine}</Typography>
        <Divider sx={{ my: 2 }} />

        <Typography><b>Description:</b> {recipe.description}</Typography>
        <Typography>
          <b>Total Time:</b> {recipe.total_time} mins
        </Typography>
        <Typography sx={{ ml: 2 }}>
          (Prep: {recipe.prep_time} mins, Cook: {recipe.cook_time} mins)
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Nutrition</Typography>
        <Table>
          <TableBody>
            {Object.entries(recipe.nutrients || {}).map(([k, v]) => (
              <TableRow key={k}>
                <TableCell>{k}</TableCell>
                <TableCell>{v}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Drawer>
  );
}
