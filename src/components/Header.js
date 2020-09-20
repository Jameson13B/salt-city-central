import React, { Fragment, useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from 'glamor'

import { Icon } from '../assets/Icons'
import { auth, appVerify } from '../firebase'

const reducer = (state, action) => {
  switch (action.type) {
    case 'saveUser':
      return { ...state, user: action.payload }
    case 'clearUser':
      return { ...state, user: null, verificationId: null, message: null }
    case 'saveId':
      return { ...state, verificationId: action.payload, message: null }
    case 'toggleProfile':
      return { ...state, showProfile: action.payload }
    case 'setMessage':
      return { ...state, message: action.payload }
    case 'resetVerify':
      return { ...state, verificationId: null, message: action.payload }
    default:
      return state
  }
}

export const Header = () => {
  const [state, dispatch] = useReducer(reducer, {
    showProfile: false,
    user: null,
    verificationId: null,
    message: null,
  })
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const styles = getStyles()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && dispatch({ type: 'saveUser', payload: user })
    })
  }, [])

  const handleLogin = () => {
    const recaptcha = appVerify('recaptcha-container')

    if (!phoneNumber || phoneNumber < 10) {
      dispatch({ type: 'setMessage', payload: 'Phone number must be 10 digits' })
    } else {
      auth
        .signInWithPhoneNumber(`+1${phoneNumber}`, recaptcha)
        .then((confirmResult) => {
          recaptcha.clear()
          dispatch({ type: 'saveId', payload: confirmResult })
          setPhoneNumber('')
        })
        .catch((error) => {
          recaptcha.clear()
          dispatch({ type: 'setMessage', payload: error.message })
        })
    }
  }
  const handleVerify = () => {
    if (!verifyCode || verifyCode.length !== 6) {
      dispatch({ type: 'setMessage', payload: 'Verify Code must be 6 digits' })
    } else {
      state.verificationId
        .confirm(verifyCode)
        .then((res) => {
          dispatch({ type: 'saveUser', payload: res.user })
          setVerifyCode('')
        })
        .catch((error) => dispatch({ type: 'resetVerify', payload: error.message }))
    }
  }
  const handleSignOut = () => {
    auth.signOut()
    dispatch({ type: 'clearUser' })
  }

  return (
    <div style={styles.header}>
      <Link style={styles.title} to="/">
        <h1 style={{ marginBottom: 10 }}>Salt City Central</h1>
      </Link>
      <div style={styles.lock}>
        {
          <Icon
            className={styles.icon}
            onClick={() => dispatch({ type: 'toggleProfile', payload: true })}
            type="lock"
          />
        }
      </div>
      {state.showProfile && (
        <Fragment>
          <div
            onClick={() => dispatch({ type: 'toggleProfile', payload: false })}
            style={styles.profile}
          />
          <div style={styles.content}>
            <Icon
              className={styles.close}
              onClick={() => dispatch({ type: 'toggleProfile', payload: false })}
              size="30"
              type="close-skinny"
            />
            {!state.user ? (
              <Fragment>
                <h3 style={styles.profileTitle}>Admin Login Only</h3>
                <br />
                {!state.verificationId ? (
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    style={styles.rounded}
                    value={phoneNumber}
                  />
                ) : (
                  <input
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="Verification Code"
                    style={styles.rounded}
                    value={verifyCode}
                  />
                )}
                <div id="recaptcha-container" style={{ margin: '10px 0' }} />
                <button
                  onClick={!state.verificationId ? handleLogin : handleVerify}
                  style={styles.rounded}
                >
                  {!state.verificationId ? 'Login' : 'Verify'}
                </button>
                {state.message && <p>{state.message}</p>}
              </Fragment>
            ) : (
              <Fragment>
                <h3 style={styles.profileTitle}>User Profile</h3>
                <p>{state.user.phoneNumber}</p>
                <Link className={styles.adminLink} to="/admin-form">
                  <button
                    onClick={() => dispatch({ type: 'toggleProfile', payload: false })}
                    style={styles.adminButton}
                  >
                    Admin Form
                  </button>
                </Link>
                <button onClick={handleSignOut} className={styles.signOutButton}>
                  Sign Out
                </button>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  )
}

const getStyles = () => {
  return {
    header: {
      borderBottom: '1px solid black',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
    },
    title: {
      color: 'black',
      marginBottom: 0,
      textDecoration: 'none',
    },
    lock: {
      alignItems: 'flex-end',
      display: 'flex',
      fill: 'black',
    },
    icon: css({
      cursor: 'pointer',
      marginBottom: 15,
      ':hover': {
        height: 30,
        width: 30,
      },
    }),
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
    adminLink: css({
      border: '2px solid black',
      borderRadius: '5px',
      boxShadow: 'rgba(87, 102, 117, 0.2) 3px 3px 3px',
      color: 'black',
      textDecoration: 'none',
      ':hover > button': {
        fontWeight: 'bold',
      },
    }),
    adminButton: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '5px',
      textAlign: 'center',
      width: '100%',
    },
    signOutButton: css({
      background: 'white',
      border: '2px solid black',
      borderRadius: '5px',
      boxShadow: 'rgba(87, 102, 117, 0.2) 3px 3px 3px',
      color: 'black',
      cursor: 'pointer',
      padding: '5px',
      marginTop: '10px',
      ':hover': {
        fontWeight: 'bold',
      },
    }),
    rounded: {
      padding: 10,
      borderRadius: 5,
    },
  }
}
