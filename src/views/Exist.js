import React from 'react'

export const Exist = () => {
  const styles = getStyles()

  return (
    <div style={styles.exist}>
      <h2>Exist</h2>
    </div>
  )
}

const getStyles = () => {
  return {
    exist: {},
  }
}
