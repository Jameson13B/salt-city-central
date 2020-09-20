import React, { useState } from 'react'
import { css } from 'glamor'

import { addRestaurant } from '../../firebase'

const initialState = {
  name: '',
  neighborhood: '',
  url: '',
  description: '',
  author_notes: '',
  attended: false,
}

export const NewEatForm = () => {
  const [form, updateForm] = useState(initialState)
  const [feedback, setFeedback] = useState(null)
  const styles = getStyles()

  const handleInputChange = (e) => {
    e.preventDefault()
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    updateForm({ ...form, [target.name]: value })
  }
  const handleClear = (e) => {
    e.preventDefault()
    updateForm(initialState)
    setFeedback(null)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      form.name === '' ||
      form.neighborhood === '' ||
      form.description === '' ||
      form.author_notes === ''
    ) {
      setFeedback('Missing Required Info')
    } else {
      addRestaurant
        .add(form)
        .then(() => {
          updateForm(initialState)
          setFeedback('Created New Eat')
        })
        .catch(() => setFeedback('Only Admin Can Submit New Eats'))
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: 5 }}>New Eat</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="name" style={styles.label}>
          Name*
        </label>
        <input
          id="name"
          name="name"
          onChange={handleInputChange}
          style={styles.input}
          value={form.name}
        />
        <label htmlFor="neighborhood" style={styles.label}>
          Neighborhood*
        </label>
        <input
          id="neighborhood"
          name="neighborhood"
          onChange={handleInputChange}
          style={styles.input}
          value={form.neighborhood}
        />
        <label htmlFor="url" style={styles.label}>
          URL
        </label>
        <input
          id="url"
          name="url"
          onChange={handleInputChange}
          style={styles.input}
          value={form.url}
        />
        <label htmlFor="description" style={styles.label}>
          Description*
        </label>
        <input
          id="description"
          name="description"
          onChange={handleInputChange}
          style={styles.input}
          value={form.description}
        />
        <label htmlFor="author_notes" style={styles.label}>
          Author Notes*
        </label>
        <input
          id="author_notes"
          name="author_notes"
          onChange={handleInputChange}
          style={styles.input}
          value={form.author_notes}
        />
        <div style={styles.radioGroup}>
          <label htmlFor="attended" style={styles.label}>
            Attended?
          </label>
          <input
            checked={form.attended}
            id="attended"
            name="attended"
            onChange={handleInputChange}
            type="checkbox"
            style={styles.radio}
          />
        </div>
        <div style={styles.buttonGroup}>
          <input className={styles.button} type="submit" value="Create" />
          <button className={styles.button} onClick={handleClear}>
            Clear
          </button>
        </div>
        {feedback && <p style={styles.feedback}>**{feedback}**</p>}
      </form>
    </div>
  )
}

export default NewEatForm

const getStyles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    width: '100%',
  },
  label: {
    color: 'slategrey',
    fontSize: '14px',
    marginBottom: '5px',
    marginLeft: '10px',
    marginTop: '15px',
  },
  input: {
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
  },
  radioGroup: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    margin: '15px auto 0',
    maxWidth: '200px',
    width: '100%',
  },
  radio: {
    height: '20px',
    marginTop: '15px',
    width: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: css({
    background: 'white',
    border: '2px solid black',
    borderRadius: 5,
    boxShadow: 'rgba(87, 102, 117, 0.2) 3px 3px 3px',
    color: 'black',
    cursor: 'pointer',
    padding: 10,
    width: '48%',
    ':hover': {
      backgroundColor: 'lightgrey',
      color: 'white',
      fontWeight: 'bold',
    },
  }),
  feedback: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
})
