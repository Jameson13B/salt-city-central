import React from 'react'

export const Eat = () => {
  const styles = getStyles()

  return (
    <div style={styles.eat}>
      <h2>Eat</h2>
    </div>
  )
}

const getStyles = () => {
  return {
    eat: {},
  }
}
