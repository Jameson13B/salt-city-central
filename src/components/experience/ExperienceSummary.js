import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../assets/Icons'

export const ExperienceSummary = (props) => {
  const { experience } = props
  const styles = getStyles()

  return (
    <li style={styles.experience}>
      <Link
        style={{
          textDecoration: 'none',
          color: 'black',
        }}
        to={`/experience/${experience.id}`}
      >
        <div style={styles.header}>
          <h2 style={{ marginTop: 0 }}>
            {experience.name} {experience.attended && <Icon type="check" />}
          </h2>
          <p style={{ fontStyle: 'italic', marginTop: 0 }}>{experience.neighborhood}</p>
        </div>
        <p>{experience.description}</p>
      </Link>
    </li>
  )
}

const getStyles = () => {
  return {
    experience: {
      border: '3px solid',
      borderBottomWidth: '13px',
      cursor: 'pointer',
      padding: 10,
      margin: '15px 0',
      listStyle: 'none',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }
}
