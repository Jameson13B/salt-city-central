import React from 'react'
import { Route } from 'react-router-dom'
import { Header } from './components/Header'
import { NavBar } from './components/NavBar'
import { Home } from './views/Home'
import { Eat } from './views/Eat'
import { Do } from './views/Do'
import { Join } from './views/Join'

function App() {
  const styles = getStyles()

  return (
    <div style={styles.app}>
      <Header />
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path='/eat' component={Eat} />
      <Route path='/do' component={Do} />
      <Route path='/join' component={Join} />
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
  }
}
