// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CategoryForm from '@/views/categories/CategoryForm'

const CreateCategoryForm = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <CategoryForm />
      </Grid>
    </Grid>
  )
}

export default CreateCategoryForm
