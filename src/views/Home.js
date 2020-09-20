import React from 'react'

export const Home = () => {
  const styles = getStyles()

  return (
    <div style={styles.home}>
      <h1>Welcome to Salt City Central</h1>
      <h3 style={styles.description}>
        Your central hub for the places to eat, the things to experience, and opportunities to exist
        in Salt Lake City.
      </h3>
    </div>
  )
}

const getStyles = () => {
  return {
    home: {
      textAlign: 'center',
    },
    description: {
      maxWidth: '500px',
      margin: '0 auto',
    },
  }
}
