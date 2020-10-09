import React, { useEffect, useState } from 'react'

import { restaurants, experiences } from '../firebase'
import { EatSummary } from '../components/eats/EatSummary'
import { ExperienceSummary } from '../components/experience/ExperienceSummary'

export const Home = () => {
  const [featEats, setFeatEats] = useState([])
  const [featExperiences, setFeatExperiences] = useState([])
  const styles = getStyles()

  useEffect(() => {
    restaurants('featured', '==', true)
      .get()
      .then((res) => {
        let list = []

        res.forEach((eat) => (list = [...list, { id: eat.id, ...eat.data() }]))

        setFeatEats(list)
      })

    experiences('featured', '==', true)
      .get()
      .then((res) => {
        let list = []

        res.forEach((eat) => (list = [...list, { id: eat.id, ...eat.data() }]))

        setFeatExperiences(list)
      })
  }, [])

  return (
    <div style={styles.home}>
      <h1 style={{ marginTop: 0 }}>Welcome to Salt City Central</h1>
      <h3 style={styles.description}>
        Your central hub for the places to eat, the things to experience, and opportunities to exist
        in Salt Lake City.
      </h3>

      <div style={styles.featuredLists}>
        <h3 style={styles.featHeaders}>Featured Eats</h3>
        {featEats.length === 0 && <h3 style={styles.loading}>Loading...</h3>}
        {featEats.map((eat) => (
          <EatSummary eat={eat} key={eat.id} />
        ))}
        <hr style={{ width: '90%', margin: '25px auto' }} />
        <h3 style={styles.featHeaders}>Featured Experiences</h3>
        {featExperiences.length === 0 && <h3 style={styles.loading}>Loading...</h3>}
        {featExperiences.map((experience) => (
          <ExperienceSummary experience={experience} key={experience.id} />
        ))}
      </div>
    </div>
  )
}

const getStyles = () => {
  return {
    home: {
      textAlign: 'center',
      padding: 10,
    },
    description: {
      maxWidth: '500px',
      margin: '0 auto',
    },
    featuredLists: {
      margin: '0 auto',
      maxWidth: 500,
      paddingTop: 20,
    },
    featHeaders: {
      color: 'grey',
    },
  }
}
