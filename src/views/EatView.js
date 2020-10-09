import React, { useEffect, useState } from 'react'
import { css } from 'glamor'

import { restaurants } from '../firebase'
import { EatSummary } from '../components/eats/EatSummary'
import { FilterModal } from '../components/FilterModal'

export const EatView = () => {
  const [eats, setEats] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilter, toggleFilter] = useState(false)
  const [filter, updateFilter] = useState('all')
  const styles = getStyles()

  useEffect(() => {
    let unsubscribe = restaurants((res) => {
      let list = []
      let featuredList = []

      res.forEach((eat) => {
        if (eat.featured) {
          featuredList = [...featuredList, { id: eat.id, ...eat.data() }]
        }
        list = [...list, { id: eat.id, ...eat.data() }]
      })

      featuredList = list.filter((eat) => eat.featured)

      if (filter !== 'all') {
        list = list.filter((eat) => eat.neighborhood === filter)
      }

      setLoading(false)
      setFeatured(featuredList)
      setEats(list)
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
          {featured.map((eat) => (
            <EatSummary eat={eat} key={eat.id} />
          ))}
          <hr style={{ width: '90%', margin: '25px auto' }} />
        </ul>
      )}
      {eats.length === 0 && !loading && <h3 style={styles.loading}>No results in {filter}</h3>}
      {eats.length > 0 && (
        <ul style={styles.list}>
          {eats.map((eat) => (
            <EatSummary eat={eat} key={eat.id} />
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
          title="Filter Eats"
        />
      )}
    </div>
  )
}

const getStyles = () => {
  return {
    container: {},
    filter: css({
      background: 'white',
      border: '2px solid black',
      borderRadius: '5px',
      boxShadow: 'rgba(87, 102, 117, 0.2) 3px 3px 3px',
      color: 'black',
      cursor: 'pointer',
      padding: '5px',
      ':hover': {
        fontWeight: 'bold',
      },
    }),
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
