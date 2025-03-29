// Next Imports
import Link from 'next/link'

// MUI Imports
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const NavbarContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-2 sm:gap-4'></div>
      <div className='flex items-center'>
        <IconButton className='text-textPrimary'>
          <i className='ri-notification-2-line' />
        </IconButton>
      </div>
    </div>
  )
}

export default NavbarContent
