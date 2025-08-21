import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

export default function SearchFilters({ setFilters }) {
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [rating, setRating] = useState("");

  const handleSearch = () => {
    const filters = {};
    if (title) filters.title = title;
    if (cuisine) filters.cuisine = cuisine;
    if (rating) {
      // Always send >= by default
      filters.rating = `>=${rating}`;
    }
    setFilters(filters);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
      <TextField
        label="Rating ≥"
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Stack>
  );
}
