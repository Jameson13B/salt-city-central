import React from 'react'
import { Route } from 'react-router-dom'
// import { useTracking } from './useTracking'

import { Header } from './components/Header'
import { NavBar } from './components/NavBar'

import { Home } from './views/Home'
import { EatView } from './views/EatView'
import { ExperienceView } from './views/ExperienceView'
import { Eat } from './views/Eat'
import { Experience } from './views/Experience'
import { Exist } from './views/Exist'
import { AdminForm } from './views/AdminForm'

export const App = () => {
  const styles = getStyles()
  // Used to report routes to Google Analytics
  // useTracking()

  return (
    <div style={styles.app}>
      <Header />
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/admin-form" component={AdminForm} />
      <Route exact path="/eat" component={EatView} />
      <Route path="/eat/:id" component={Eat} />
      <Route exact path="/experience" component={ExperienceView} />
      <Route path="/experience/:id" component={Experience} />
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
