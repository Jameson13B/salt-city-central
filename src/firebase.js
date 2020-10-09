import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

// Database instance
export const database = Firebase.firestore()
export const restaurants = (a, b, c) => database.collection('restaurants').where(a, b, c)
export const experiences = (a, b, c) => database.collection('experiences').where(a, b, c)
export const getRestaurant = (id) => database.collection('restaurants').doc(id)
export const getExperience = (id) => database.collection('experiences').doc(id)
export const getRestaurants = (cb) => database.collection('restaurants').onSnapshot(cb)
export const getExperiences = (cb) => database.collection('experiences').onSnapshot(cb)
export const addRestaurant = database.collection('restaurants')
export const addExperiences = database.collection('experiences')
export const serverTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()

// Authorization instance
export const auth = Firebase.auth()
export const appVerify = (id) => new firebase.auth.RecaptchaVerifier(id, { size: 'compact' })
