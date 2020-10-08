import React, { useEffect, useState } from 'react'
import { restaurants } from '../firebase'
import { EatSummary } from '../components/eats/EatSummary'

export const EatView = () => {
  const [eats, setEats] = useState([])
  const styles = getStyles()

  useEffect(() => {
    let unsubscribe = restaurants((res) => {
      let list = []

      res.forEach((eat) => (list = [...list, { id: eat.id, ...eat.data() }]))
      setEats(list)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div style={styles.container}>
      {eats.length === 0 && <h3 style={styles.loading}>Loading...</h3>}
      {eats.length > 0 && (
        <ul style={styles.list}>
          <p style={{ color: 'grey', fontSize: '15px', marginBottom: -5, marginLeft: 10 }}>
            Featured
          </p>
          {eats
            .filter((eat) => eat.featured)
            .map((eat) => {
              return <EatSummary eat={eat} key={eat.id} />
            })}
          <hr style={{ width: '90%', margin: '25px auto' }} />
          {eats
            .filter((eat) => !eat.featured)
            .map((eat) => {
              return <EatSummary eat={eat} key={eat.id} />
            })}
        </ul>
      )}
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
