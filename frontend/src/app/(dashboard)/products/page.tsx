// MUI Imports
import Link from 'next/link'

import Grid from '@mui/material/Grid'

// Component Imports
import Button from '@mui/material/Button'

import Table from '@/views/products/ListProduct'

const Forms = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Button variant='contained' type='submit'>
          <Link href='products/create'>Novo Produto</Link>
        </Button>
      </Grid>
      <Grid item xs={12} md={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default Forms
