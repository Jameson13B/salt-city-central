import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ReactGA from 'react-ga'

export const useTracking = (trackingId = process.env.REACT_APP_GA_ID) => {
  const { listen } = useHistory()

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_ID)
    const unlisten = listen((location) => {
      if (!trackingId) {
        console.log(
          'Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.',
        )
        return
      }

      ReactGA.pageview(location.pathname)
    })

    return unlisten
  }, [trackingId, listen])
}
