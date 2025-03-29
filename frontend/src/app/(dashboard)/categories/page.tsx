// MUI Imports
import Link from 'next/link'

import Grid from '@mui/material/Grid'

// Component Imports
import Button from '@mui/material/Button'

import Table from '@/views/categories/ListCategory'

const Forms = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Button variant='contained' type='submit'>
          <Link href='categories/create'>Nova categoria</Link>
        </Button>
      </Grid>
      <Grid item xs={12} md={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default Forms
