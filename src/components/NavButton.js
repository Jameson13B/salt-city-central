import React from 'react'
import './NavButton.css'

export const NavButton = ({ type, children }) => {
  const supportedTypes = ['btn-dots', 'btn-pulse', 'btn-zigzag']

  if (!supportedTypes.includes(type)) {
    console.error('ERROR: NavButton type must be btn-dots, btn-pulse, or btn-zigzag.')
    return <p style={{ color: 'red', fontSize: '10px' }}>ERROR: Console</p>
  }

  return <button className={`btn ${type}`}>{children}</button>
}
