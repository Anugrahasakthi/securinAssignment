// import React from "react";
// import RecipeTable from "./components/RecipeTable";

// function App() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🍲 Recipe Dashboard</h1>
//       <RecipeTable />
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import { Container, Typography, Pagination, Select, MenuItem } from "@mui/material";
import RecipeTable from "./components/RecipeTable";
import RecipeDrawer from "./components/RecipeDrawer";
import SearchFilters from "./components/SearchFilters";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filters, setFilters] = useState({});

  // 🔹 Load recipes from mock-data.json
  const fetchRecipes = async () => {
    try {
      const response = await fetch("/mock-data.json");
      const data = await response.json();
      setRecipes(data.recipes.slice((page - 1) * limit, page * limit)); // add pagination
      setTotal(data.recipes.length);
    } catch (err) {
      console.error("Error loading mock data:", err);
    }
  };

  // 🔹 Fake search using filters
  const searchRecipes = async () => {
    try {
      const response = await fetch("/mock-data.json");
      const data = await response.json();

      let filtered = data.recipes;

      // Example filter: by title
      if (filters.title) {
        filtered = filtered.filter(r =>
          r.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }

      setRecipes(filtered.slice((page - 1) * limit, page * limit));
      setTotal(filtered.length);
    } catch (err) {
      console.error("Error searching mock data:", err);
    }
  };

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      searchRecipes();
    } else {
      fetchRecipes();
    }
  }, [page, limit, filters]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        🍽 Recipe Explorer
      </Typography>

      <SearchFilters setFilters={setFilters} />

      <RecipeTable recipes={recipes} onRowClick={setSelectedRecipe} />

      {recipes.length === 0 && (
        <Typography variant="h6" align="center" color="text.secondary">
          No results found ⚠
        </Typography>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(e, val) => setPage(val)}
        />
        <Select value={limit} onChange={(e) => setLimit(e.target.value)}>
          {[15, 20, 30, 50].map((num) => (
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))}
        </Select>
      </div>

      <RecipeDrawer recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </Container>
  );
}

export default App;

