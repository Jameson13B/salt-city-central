import React from 'react'

export const EatSummary = (props) => {
  const { eat } = props
  const styles = getStyles()

  return (
    <li style={styles.eat}>
      <div style={styles.eatHeader}>
        <h2 style={{ marginTop: 0 }}>{eat.name}</h2>
        <p style={{ fontStyle: 'italic', marginTop: 0 }}>{eat.neighborhood}</p>
      </div>
      <p>{eat.description}</p>
    </li>
  )
}

const getStyles = () => {
  return {
    eat: {
      border: '3px solid',
      borderBottomWidth: '13px',
      padding: 10,
      margin: '15px 0',
      listStyle: 'none',
    },
    eatHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }
}
