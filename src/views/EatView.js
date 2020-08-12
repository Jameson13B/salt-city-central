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
    list: {
      paddingLeft: 0,
      margin: '0 15px',
    },
  }
}
