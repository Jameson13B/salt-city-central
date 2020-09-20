import React from 'react'
import { Link } from 'react-router-dom'


export const EatSummary = (props) => {
  const { eat } = props
  const styles = getStyles()

  return (
    <li style={styles.eat}>
      <Link
        style={{
          textDecoration: 'none',
          color: 'black',
        }}
        to={`/eat/${eat.id}`}
      >
        <div style={styles.eatHeader}>
          <h2 style={{ marginTop: 0 }}>
            {eat.name} {eat.attended && <span>&#10004;</span>}
          </h2>
          <p style={{ fontStyle: 'italic', marginTop: 0 }}>{eat.neighborhood}</p>
        </div>
        <p>{eat.description}</p>
      </Link>
    </li>
  )
}

const getStyles = () => {
  return {
    eat: {
      border: '3px solid',
      borderBottomWidth: '13px',
      cursor: 'pointer',
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
