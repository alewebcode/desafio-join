"use client";
// MUI Imports
import Grid from "@mui/material/Grid";

// Component Imports
import ProductForm from "@/views/products/ProductForm";
import { useParams } from "next/navigation";

const EditProductForm = () => {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <ProductForm productId={productId} />
      </Grid>
    </Grid>
  );
};

export default EditProductForm;
