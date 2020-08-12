import React from 'react'
import { NavBar } from './components/NavBar'

function App() {
  const styles = getStyles()

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={{ marginBottom: 10 }}>Salt City Central</h1>
        <h1 style={{ marginBottom: 10 }}>AB</h1>
      </div>
      <NavBar />
    </div>
  )
}

export default App

const getStyles = () => {
  return {
    app: {
      maxWidth: '768px',
      margin: '0 auto',
    },
    header: {
      borderBottom: '1px solid black',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }
}
