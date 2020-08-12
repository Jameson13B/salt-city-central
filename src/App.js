import React from 'react'
import { Route } from 'react-router-dom'
import { Header } from './components/Header'
import { NavBar } from './components/NavBar'
import { Home } from './views/Home'
import { Eat } from './views/Eat'
import { Experience } from './views/Experience'
import { Exist } from './views/Exist'

export const App = () => {
  const styles = getStyles()

  return (
    <div style={styles.app}>
      <Header />
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/eat" component={Eat} />
      <Route path="/experience" component={Experience} />
      <Route path="/exist" component={Exist} />
    </div>
  )
}

const getStyles = () => {
  return {
    app: {
      maxWidth: '768px',
      margin: '0 auto',
    },
  }
}
