import React, { createContext, useState } from 'react'

export const LocationContext = createContext()

export function LocationProvider(props) {
    const [locationData, setLocationData] = useState({
        federationState: null,
        isSessionValidated: false,
    })

    return (
        <LocationContext.Provider value={[locationData, setLocationData]}>
            {props.children}
        </LocationContext.Provider>
    )
}