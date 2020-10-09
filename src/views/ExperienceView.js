import React, { useEffect, useState } from 'react'

import { getExperiences } from '../firebase'
import { ExperienceSummary } from '../components/experience/ExperienceSummary'
import { FilterModal } from '../components/FilterModal'

export const ExperienceView = () => {
  const [experiences, setExperiences] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilter, toggleFilter] = useState(false)
  const [filter, updateFilter] = useState('all')
  const styles = getStyles()

  useEffect(() => {
    let unsubscribe = getExperiences((res) => {
      let list = []
      let featuredList = []

      res.forEach((experience) =>
        experience.data().featured
          ? (featuredList = [...featuredList, { id: experience.id, ...experience.data() }])
          : (list = [...list, { id: experience.id, ...experience.data() }]),
      )

      if (filter !== 'all') {
        list = list.filter((eat) => eat.neighborhood === filter)
      }

      setLoading(false)
      setFeatured(featuredList)
      setExperiences(list)
    })

    return () => unsubscribe()
  }, [filter])

  return (
    <div style={styles.container}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 16px',
        }}
      >
        <p style={{ color: 'grey', fontSize: '15px', marginBottom: -5, marginTop: 0 }}>Featured</p>
        <button className={styles.filter} onClick={() => toggleFilter(true)}>
          Filter {filter !== 'all' && <span style={{ fontWeight: 'bold' }}>- {filter}</span>}
        </button>
      </div>
      {loading && <h3 style={styles.loading}>Loading...</h3>}
      {featured.length > 0 && (
        <ul style={styles.list}>
          {featured.map((experience) => (
            <ExperienceSummary experience={experience} key={experience.id} />
          ))}
          <hr style={{ width: '90%', margin: '25px auto' }} />
        </ul>
      )}
      {experiences.length === 0 && !loading && (
        <h3 style={styles.loading}>No results in {filter}</h3>
      )}
      {experiences.length > 0 && (
        <ul style={styles.list}>
          {experiences.map((experience) => (
            <ExperienceSummary experience={experience} key={experience.id} />
          ))}
        </ul>
      )}
      {showFilter && (
        <FilterModal
          filter={filter}
          handleClose={() => toggleFilter(false)}
          handleSubmit={(filter) => {
            updateFilter(filter)
            toggleFilter(false)
          }}
          title="Filter Experiences"
        />
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
