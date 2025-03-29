// MUI Imports
"use client";
import Grid from "@mui/material/Grid";

// Component Imports
import CategoryForm from "@/views/categories/CategoryForm";
import { useParams } from "next/navigation";

const EditCategoryForm = () => {
  const params = useParams();
  const categoryId = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <CategoryForm categoryId={categoryId} />
      </Grid>
    </Grid>
  );
};

export default EditCategoryForm;
