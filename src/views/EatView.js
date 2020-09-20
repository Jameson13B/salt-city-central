import React, { useEffect, useState } from 'react'
import { restaurants } from '../firebase'
import { EatSummary } from '../components/eats/EatSummary'

export const EatView = () => {
  const [eats, setEats] = useState([])
  const styles = getStyles()

  useEffect(() => {
    restaurants((res) => {
      let list = []

      res.forEach((eat) => (list = [...list, { id: eat.id, ...eat.data() }]))
      setEats(list)
    })
  }, [eats])

  return (
    <div style={styles.container}>
      {eats.length === 0 && <h3 style={styles.loading}>Loading...</h3>}
      <ul style={styles.list}>
        {eats.map((eat) => {
          return <EatSummary eat={eat} key={eat.id} />
        })}
      </ul>
    </div>
  )
}

const getStyles = () => {
  return {
    container: {},
    loading: {
      marginTop: '80px',
      textAlign: 'center',
    },
    list: {
      paddingLeft: 0,
      margin: '0 15px',
    },
  }
}
