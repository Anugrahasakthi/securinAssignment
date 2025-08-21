// import React, { useEffect, useState } from "react";
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead,
//   TableRow, Paper, TablePagination, Rating, TextField, Button
// } from "@mui/material";
// import RecipeDrawer from "./RecipeDrawer";
// import { getRecipes, searchRecipes } from "../api";

// const RecipeTable = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [total, setTotal] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     loadRecipes(page + 1, rowsPerPage);
//   }, [page, rowsPerPage]);

//   const loadRecipes = async (page, limit) => {
//     const { data } = await getRecipes(page, limit);
//     setRecipes(data.data);
//     setTotal(data.total);
//   };

//   const handleSearch = async () => {
//     const { data } = await searchRecipes({ title: search });
//     setRecipes(data.data);
//     setTotal(data.data.length);
//   };

//   return (
//     <>
//       <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//         <TextField
//           label="Search by Title"
//           variant="outlined"
//           size="small"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <Button variant="contained" onClick={handleSearch}>Search</Button>
//       </div>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Title</TableCell>
//               <TableCell>Cuisine</TableCell>
//               <TableCell>Rating</TableCell>
//               <TableCell>Total Time</TableCell>
//               <TableCell>Serves</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {recipes.map((r) => (
//               <TableRow key={r.id} onClick={() => setSelected(r)} style={{ cursor: "pointer" }}>
//                 <TableCell>{r.title.length > 30 ? r.title.slice(0, 30) + "..." : r.title}</TableCell>
//                 <TableCell>{r.cuisine}</TableCell>
//                 <TableCell><Rating value={r.rating || 0} precision={0.1} readOnly /></TableCell>
//                 <TableCell>{r.total_time}</TableCell>
//                 <TableCell>{r.serves}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={total}
//         page={page}
//         onPageChange={(e, newPage) => setPage(newPage)}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={(e) => {
//           setRowsPerPage(parseInt(e.target.value, 10));
//           setPage(0);
//         }}
//         rowsPerPageOptions={[5, 10, 15, 20, 50]}
//       />

//       {selected && (
//         <RecipeDrawer recipe={selected} onClose={() => setSelected(null)} />
//       )}
//     </>
//   );
// };

// export default RecipeTable;

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Rating } from "@mui/material";

export default function RecipeTable({ recipes, onRowClick }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Cuisine</TableCell>
          <TableCell>Rating</TableCell>
          <TableCell>Total Time</TableCell>
          <TableCell>Serves</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {recipes.map((r) => (
          <TableRow key={r.id} hover onClick={() => onRowClick(r)}>
            <TableCell>{r.title.length > 30 ? r.title.slice(0, 30) + "..." : r.title}</TableCell>
            <TableCell>{r.cuisine}</TableCell>
            <TableCell>
              <Rating value={r.rating || 0} precision={0.5} readOnly />
            </TableCell>
            <TableCell>{r.total_time} mins</TableCell>
            <TableCell>{r.serves}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
