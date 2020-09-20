import React from 'react'

import { NewEatForm } from '../components/admin/NewEatForm'

export const AdminForm = () => {
  const styles = getStyles()

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: 0 }}>Admin Form</h1>
      <NewEatForm />
    </div>
  )
}

export default AdminForm

const getStyles = () => {
  return {
    container: {},
  }
}
