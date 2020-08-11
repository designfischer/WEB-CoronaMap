import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../Services/api'
import { LocationContext } from '../../Context/LocationContext'

function SearchInputs({ value, setValue, searchCases }) {
    const history = useHistory()

    const [locationData, setLocationData] = useContext(LocationContext)
    const [coronaDataByState, setCoronaDataByState] = useState([])  
    const [usersState, setUsersState] = useState('')  

    const [stateName, setStateName] = useState('')
    const [stateDeaths, setStateDeaths] = useState(0)
    const [stateCases, setStateCases] = useState(0)
    const [stateSuspects, setStateSuspects] = useState(0)
    
    useEffect(() => {getCoronaDataByState()}, [])

    async function getCoronaDataByState() {
        try {
            const dataCoronaState = await api.get('/')
            const { data } = dataCoronaState           
            setCoronaDataByState(data.data)
        } catch(err) {
            alert('Não foi possível informações sobre o Covid em seu estado')
        }
    }

    useEffect(() => {        
        const chosenState = coronaDataByState.filter(state => state.uid == locationData.federationState) 
        const finalState = chosenState[0]      
        setUsersState(finalState)
    }, [coronaDataByState]) 
    
    useEffect(() => {    
        if (usersState !== undefined) {            
            setStateName(usersState.state)
            setStateDeaths(usersState.deaths)
            setStateCases(usersState.cases)
            setStateSuspects(usersState.suspects)
        }   
    }, [usersState])

    return (
        <div className="search-params-container">
            <div className="search-params">
                <h1>Corona Map</h1>  
                <div className="state-statistics">
                    <h2>{stateName}</h2>
                    <div className="state-statistics-numbers">
                        <h3>{stateCases} casos confirmados</h3>
                        <h3>{stateDeaths} mortes</h3>
                        <h3>{stateSuspects} casos suspeitos</h3>
                    </div>                    
                </div>              
                <form>
                    
                        <p>Distância máxima (km)</p>
                        <input 
                            type="number"                             
                            value={value}
                            onChange={e=>setValue(e.target.value)}  
                            max='20'
                            min='1'                       
                        />
                        <button onClick={searchCases}>Mostrar casos</button>
                        <button onClick={() => history.push('/')}>X</button>
                                          
                    
                </form>
            </div>              
        </div>
    )
}

export default SearchInputs
