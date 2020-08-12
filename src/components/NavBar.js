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
      <Link style={styles.link} to="/do">
        <NavButton type="btn-pulse">Do</NavButton>
      </Link>
      <Link style={styles.link} to="/join">
        <NavButton type="btn-zigzag">Join</NavButton>
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
