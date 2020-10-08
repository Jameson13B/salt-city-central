import React, { Fragment } from 'react'
import { css } from 'glamor'

import { Icon } from '../assets/Icons'

export const FilterModal = (props) => {
  const { filter, handleClose, handleSubmit, title } = props
  const styles = getStyles()

  return (
    <Fragment>
      <div onClick={handleClose} style={styles.profile} />
      <div style={styles.content}>
        <Icon className={styles.close} onClick={handleClose} size="30" type="close-skinny" />
        <Fragment>
          <h3 style={styles.profileTitle}>{title}</h3>
          <div style={styles.buttonGroup}>
            <button
              autoFocus={filter === 'all'}
              onClick={() => handleSubmit('all')}
              className={styles.rounded}
            >
              All
            </button>
            <button
              autoFocus={filter === 'Capitol Hill'}
              onClick={() => handleSubmit('Capitol Hill')}
              className={styles.rounded}
            >
              Capitol Hill
            </button>
            <button
              autoFocus={filter === 'Downtown'}
              onClick={() => handleSubmit('Downtown')}
              className={styles.rounded}
            >
              Downtown
            </button>
            <button
              autoFocus={filter === 'Marmalade'}
              onClick={() => handleSubmit('Marmalade')}
              className={styles.rounded}
            >
              Marmalade
            </button>
            <button
              autoFocus={filter === 'Granary District'}
              onClick={() => handleSubmit('Granary District')}
              className={styles.rounded}
            >
              Granary District
            </button>
            <button
              autoFocus={filter === 'Liberty Wells'}
              onClick={() => handleSubmit('Liberty Wells')}
              className={styles.rounded}
            >
              Liberty Wells
            </button>
            <button
              autoFocus={filter === 'Liberty Park'}
              onClick={() => handleSubmit('Liberty Park')}
              className={styles.rounded}
            >
              Liberty Park
            </button>
          </div>
        </Fragment>
      </div>
    </Fragment>
  )
}

const getStyles = () => ({
  profile: {
    background: 'rgba(241, 241, 241, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    textAlign: 'center',
  },
  content: {
    background: 'white',
    border: '2px solid black',
    borderRadius: '5px',
    boxShadow: 'rgba(87, 102, 117, 0.2) 5px 5px 3px',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 25px 20px',
    position: 'absolute',
    top: 100,
    left: '40%',
    width: 300,
    zIndex: 1001,
  },
  close: css({
    alignSelf: 'flex-end',
    cursor: 'pointer',
  }),
  profileTitle: {
    marginTop: '0',
    marginBottom: '0',
  },
  buttonGroup: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    height: 225,
    justifyContent: 'space-between',
  },
  rounded: css({
    background: 'white',
    border: '2px solid black',
    borderRadius: 5,
    boxShadow: 'rgba(87, 102, 117, 0.2) 3px 3px 3px',
    color: 'black',
    cursor: 'pointer',
    height: 55,
    padding: 10,
    marginTop: '10px',
    width: 90,
    ':hover': {
      fontWeight: 'bold',
    },
    ':focus': {
      fontWeight: 'bold',
    },
  }),
})
