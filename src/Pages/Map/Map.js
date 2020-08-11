import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

import { generateError } from '../../Function/Error'

import apiComercio from '../../Services/apiComercio'

import MarkerContent from '../../Components/MarkerContent/MarkerContent'
import SearchInputs from '../../Components/SearchInputs/SearchInputs'

const mapboxGlToken = 'pk.eyJ1IjoiZGVzaWduZmlzY2hlciIsImEiOiJjazhuZWk4Z28wdDc1M21wczExbzRkaGZkIn0.JrFY7DZmu_I2AdAd2OqNXw'

function Map() {      
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const [maxDistance, setMaxDistance] = useState(10)
    const [errorLat, setErrorLat] = useState(0)
    const [errorLong, setErrorLong] = useState(0)

    useEffect(() => {
        getUserLocation()        
    }, [])    

    async function getUserLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            setViewport({...viewport, latitude, longitude})
            setLatitude(latitude)
            setLongitude(longitude)
        }, (err) => {
            alert('Não foi possível obter suas coordenadas, informe-as manualmente')
        }, {
            timeout: 10000
        })
    }

    const [casesData, setCasesData] = useState([])

    useEffect(() => {
        getCases()        
    }, [latitude, longitude])

    async function getCases() {
        try {
            const nearByCases = await apiComercio.get(`/case?longitude=${longitude}&latitude=${latitude}&distance=${maxDistance}`)
            const { data } = nearByCases
            setCasesData(data)
            setErrorLat(generateError())
            setErrorLong(generateError())
        } catch(err) {
            alert('Não foi possível carregar os casos')
        }
    }

    async function searchCases(e) {
        e.preventDefault()
        try {
            const nearByCases = await apiComercio.get(`/case?longitude=${longitude}&latitude=${latitude}&distance=${maxDistance}`)
            const { data } = nearByCases
            setCasesData(data)
            setErrorLat(generateError())
            setErrorLong(generateError())
        } catch(err) {
            alert('Não foi possível carregar os casos')
        }
    }    

    const [selectedCase, setSelectedCase] = useState(null)
        
    const [viewport, setViewport] = useState({
        latitude,
        longitude,
        zoom: 14,
        width: '100vw',
        height: '100vh'
    })

    return (
        <div className='map-container'>
            <ReactMapGL {...viewport}
                mapboxApiAccessToken={mapboxGlToken}
                onViewportChange={viewport => {
                    setViewport(viewport)
                }}
            >
                {casesData.map(caseData => (
                    <Marker 
                        key={caseData._id} 
                        latitude={caseData.location.coordinates[1] + errorLong} 
                        longitude={caseData.location.coordinates[0] + errorLat}
                    >
                        <button className={caseData.confirmation ?
                            'marker-button-confirmed' :
                            'marker-button'
                        } onClick={e => {
                            e.preventDefault()
                            setSelectedCase(caseData)
                            console.log(caseData)
                        }}></button>
                    </Marker>
                ))}
                
                {selectedCase ? 
                    <Popup
                        latitude={selectedCase.location.coordinates[1]}
                        longitude={selectedCase.location.coordinates[0]}
                        onClose={() => setSelectedCase(null)}
                    > 
                        <MarkerContent  
                            confirmation={selectedCase.confirmation}
                            fever={selectedCase.fever}
                            cough={selectedCase.cough}
                            smell={selectedCase.smell}
                            fatigue={selectedCase.fatigue}
                            coryza={selectedCase.coryza}
                            anorexia={selectedCase.anorexia}
                            chestPain={selectedCase.chestPain}
                            breathe={selectedCase.breathe}
                            pain={selectedCase.pain}
                            nause={selectedCase.nause}
                            created_at={selectedCase.created_at}
                            city={selectedCase.city}
                        />                    
                    </Popup> : 
                    null
                }
            </ReactMapGL>
            <SearchInputs 
                value={maxDistance}
                setValue={setMaxDistance}
                searchCases={searchCases}
            />            
        </div>
    )
}

export default Map
