import React from 'react'
import { Route } from 'react-router-dom'
import { Header } from './components/Header'
import { NavBar } from './components/NavBar'
// import { Eat } from './views/Eat'
import { Home } from './views/Home'
import { EatView } from './views/EatView'
import { Experience } from './views/Experience'
import { Exist } from './views/Exist'

export const App = () => {
  const styles = getStyles()

  return (
    <div style={styles.app}>
      <Header />
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/eat" component={EatView} />
      {/* <Route path="/eat/:id" component={Eat} /> */}
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
