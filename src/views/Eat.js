import React, { useEffect, useState } from 'react'
import { getRestaurant } from '../firebase'
import _isEmpty from 'lodash/isEmpty'

export const Eat = (props) => {
  const [eat, setEat] = useState({})
  const { match } = props
  const styles = getStyles()

  useEffect(() => {
    getRestaurant.doc(match.params.id).onSnapshot((doc) => {
      setEat({ id: doc.id, ...doc.data() })
    })
  }, [eat, match])

  return (
    <div style={styles.container}>
      {_isEmpty(eat) ? (
        <p>Loading</p>
      ) : (
        <React.Fragment>
          <div style={styles.eatHeader}>
            <h1 style={{ marginTop: 0 }}>{eat.name}</h1>
            <p style={{ fontStyle: 'italic', marginTop: 0 }}>{eat.neighborhood}</p>
          </div>
          <p>{eat.description}</p>
          <hr style={{ width: '75%' }} />
          <p style={styles.authorNotes}>"{eat.author_notes}"</p>
          <h3>Features:</h3>
          <ul>{eat.specialties && eat.specialties.map((speciality) => <li>{speciality}</li>)}</ul>
        </React.Fragment>
      )}
    </div>
  )
}

export default Eat

const getStyles = () => {
  return {
    container: {
      border: '3px solid',
      borderBottomWidth: '13px',
      cursor: 'pointer',
      padding: 20,
      margin: '15px',
      listStyle: 'none',
    },
    eatHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    authorNotes: {
      color: 'grey',
      fontStyle: 'italic',
      textAlign: 'center',
    },
  }
}