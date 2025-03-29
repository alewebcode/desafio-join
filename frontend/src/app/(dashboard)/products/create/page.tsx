// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProductForm from '@/views/products/ProductForm'

const CreateProductForm = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <ProductForm />
      </Grid>
    </Grid>
  )
}

export default CreateProductForm
