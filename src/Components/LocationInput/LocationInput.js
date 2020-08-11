import React, { useEffect, useState, useContext } from 'react'

import { LocationContext } from '../../Context/LocationContext'

import apiUf from '../../Services/apiUf'

function LocationInput({ state, setState }) {

    const [federationStates, setFederationStates] = useState([])
    const [selectedState, setSelectedState] = useState('')

    const [citiesOfAnState, setCitiesOfAnState] = useState([])    

    useEffect(() => {getFederationStates()}, [])

    async function getFederationStates() {
        try {
            const federationStates = await apiUf.get('/estados')
            const { data } = federationStates            
            setFederationStates(data)            
        } catch(err) {
            alert('Não foi possível carregar a lista de estados')
        }
    }

    useEffect(() => {getCityFromAState()}, [selectedState])

    async function getCityFromAState() {
        try {
            const citiesByAnState = await apiUf.get(`/estados/${selectedState}/municipios`)
            const { data } = citiesByAnState            
            setCitiesOfAnState(data)
        } catch(err) {
            alert('Não foi possível carregar a lista de cidades')
        }
    }

    const [locationData, setLocationData] = useContext(LocationContext)

    useEffect(() => {        
        updateLocationData()  
    }, [selectedState])

    function updateLocationData() {
        setLocationData(prevState => ({
            ...prevState,
            federationState: selectedState,
            isSessionValidated: true,
        }))
    }
    
    return (
        <div className='select-fieldset'>
            <select 
                type="select"
                value={selectedState}
                onChange={e => {                    
                    setSelectedState(e.target.value)                                        
                }}                                    
            >
                <option value="" disabled selected hidden>UF</option>
                {federationStates.map(eachState => (
                    <option 
                        key={eachState.id}
                        value={eachState.id}
                    >{eachState.sigla}</option>
                ))}
            </select>
            <select 
                type="select" 
                onChange={e=>setState(e.target.value)}   
                value={state}                                             
            >
                <option value="" disabled selected hidden>Carregando cidade...</option>
                {citiesOfAnState.map(eachCity => (
                    <option 
                        key={eachCity.id}
                        value={eachCity.nome}
                    >{eachCity.nome}</option>
                ))}
            </select>

            
        </div>
    )
}

export default LocationInput
