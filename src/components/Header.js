import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  const styles = getStyles()

  return (
    <div style={styles.header}>
      <Link style={styles.headerTitles} to="/">
        <h1 style={{ marginBottom: 10 }}>Salt City Central</h1>
      </Link>
      <Link style={styles.headerTitles} to="/">
        <h1 style={{ marginBottom: 10 }}>AB</h1>
      </Link>
    </div>
  )
}

const getStyles = () => {
  return {
    header: {
      borderBottom: '1px solid black',
      display: 'flex',
      justifyContent: 'space-between',
    },
    headerTitles: {
      color: 'black',
      marginBottom: 0,
      textDecoration: 'none',
    },
  }
}
