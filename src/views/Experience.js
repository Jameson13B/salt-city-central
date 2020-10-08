import React, { useEffect, useState } from 'react'
import { getExperience } from '../firebase'
import _isEmpty from 'lodash/isEmpty'
import { Icon } from '../assets/Icons'

export const Experience = (props) => {
  const [experience, setExperiences] = useState({})
  const { match } = props
  const styles = getStyles()

  useEffect(() => {
    let unsubscribe = getExperience(match.params.id).onSnapshot((doc) =>
      setExperiences({ id: doc.id, ...doc.data() }),
    )

    return () => unsubscribe()
  }, [match])

  return (
    <div style={styles.container}>
      {_isEmpty(experience) ? (
        <p>Loading</p>
      ) : (
        <React.Fragment>
          <div style={styles.header}>
            <h1 style={{ marginTop: 0 }}>
              {experience.name} {experience.attended && <Icon type="check" />}{' '}
              {experience.url && (
                <Icon onClick={() => window.open(experience.url, '_blank')} type="link" />
              )}
            </h1>
            <p style={{ fontStyle: 'italic', marginTop: 0 }}>{experience.neighborhood}</p>
          </div>
          <p style={styles.type}>{experience.type}</p>
          <p style={{ textAlign: 'center' }}>{experience.description}</p>
          <hr style={{ width: '75%' }} />
          <a
            href={experience.location.link}
            rel="noopener noreferrer"
            style={styles.location}
            target="_blank"
          >
            {experience.location.cords}
          </a>
        </React.Fragment>
      )}
    </div>
  )
}

const getStyles = () => {
  return {
    container: {
      border: '3px solid',
      borderBottomWidth: '13px',
      padding: 20,
      margin: '15px',
      listStyle: 'none',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    type: {
      color: 'grey',
      fontStyle: 'italic',
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 0,
    },
    location: {
      color: 'grey',
      display: 'block',
      fontStyle: 'italic',
      textAlign: 'center',
      textDecoration: 'none',
    },
  }
}
