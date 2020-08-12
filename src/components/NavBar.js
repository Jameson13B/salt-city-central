import React from 'react'
import { Link } from 'react-router-dom'
import { NavButton } from './NavButton'

export const NavBar = () => {
  const styles = getStyles()

  return (
    <div style={styles.navbar}>
      <Link style={styles.link} to="/eat">
        <NavButton type="btn-dots">Eat</NavButton>
      </Link>
      <Link style={styles.link} to="/experience">
        <NavButton type="btn-pulse">Experience</NavButton>
      </Link>
      <Link style={styles.link} to="/exist">
        <NavButton type="btn-zigzag">Exist</NavButton>
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
