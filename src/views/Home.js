import React from 'react'

export const Home = () => {
  const styles = getStyles()

  return (
    <div style={styles.home}>
      <h2>Home</h2>
    </div>
  )
}

const getStyles = () => {
  return {
    home: {},
  }
}
