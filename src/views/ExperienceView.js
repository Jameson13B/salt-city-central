import React, { useEffect, useState } from 'react'
import { experiences as experiencesAPI } from '../firebase'
import { ExperienceSummary } from '../components/experience/ExperienceSummary'

export const ExperienceView = () => {
  const [experiences, setExperiences] = useState([])
  const styles = getStyles()

  useEffect(() => {
    let unsubscribe = experiencesAPI((res) => {
      let list = []

      res.forEach((eat) => (list = [...list, { id: eat.id, ...eat.data() }]))
      setExperiences(list)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div style={styles.container}>
      {experiences.length === 0 && <h3 style={styles.loading}>Loading...</h3>}
      {experiences.length > 0 && (
        <ul style={styles.list}>
          <p style={{ color: 'grey', fontSize: '15px', marginBottom: -5, marginLeft: 10 }}>
            Featured
          </p>
          {experiences
            .filter((experience) => experience.featured)
            .map((experience) => {
              return <ExperienceSummary experience={experience} key={experience.id} />
            })}
          <hr style={{ width: '90%', margin: '25px auto' }} />
          {experiences
            .filter((experience) => !experience.featured)
            .map((experience) => {
              return <ExperienceSummary experience={experience} key={experience.id} />
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
