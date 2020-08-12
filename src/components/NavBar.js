import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NavButton } from './NavButton'

export const NavBar = () => {
  const location = useLocation()
  const styles = getStyles()

  return (
    <div style={styles.navbar}>
      <Link style={styles.link} to="/eat">
        <NavButton active={location.pathname === '/eat'} type="btn-dots">
          Eat
        </NavButton>
      </Link>
      <Link style={styles.link} to="/experience">
        <NavButton active={location.pathname === '/experience'} type="btn-pulse">
          Experience
        </NavButton>
      </Link>
      <Link style={styles.link} to="/exist">
        <NavButton active={location.pathname === '/exist'} type="btn-zigzag">
          Exist
        </NavButton>
      </Link>
    </div>
  )
}

const getStyles = () => {
  return {
    navbar: {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    link: {
      textDecoration: 'none',
    },
  }
}
