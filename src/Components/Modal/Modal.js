import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import apiComercio from '../../Services/apiComercio'

import LocationInput from '../../Components/LocationInput/LocationInput'

import Toggle from '../Toggle/Toggle'

function Modal({ closeModal }) {
    
    const [fever, setFever] = useState(false)      
    const [cough, setCough] = useState(false)   
    const [smell, setSmell] = useState(false)
    const [fatigue, setFatigue] = useState(false)
    const [coryza, setCoryza] = useState(false)
    const [anorexia, setAnorexia] = useState(false)
    const [chestPain, setChestPain] = useState(false)
    const [breathe, setBreathe] = useState(false)
    const [pain, setPain] = useState(false)
    const [nause, setNause] = useState(false)
    const [confirmation, setConfirmation] = useState(false) 
    const [city, setCity] = useState('')    
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const [sending, setSending] = useState(false)

    useEffect(() => {getUserLocation()}, [])

    async function getUserLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            setLatitude(latitude)
            setLongitude(longitude)
        }, (err) => {
            alert('Não foi possível obter suas coordenadas, informe-as manualmente')
        }, {
            timeout: 10000
        })
    }

    const history = useHistory()

    async function newCaseHandler() {
        setSending(true)


        try {
            await apiComercio.post('/case', {
                fever,
                cough,
                smell,
                fatigue,
                coryza,
                anorexia,
                chestPain,
                breathe,
                pain,
                nause,
                confirmation,
                city,
                latitude,
                longitude
            })

                        
            history.push('/map')

        } catch(err) {

            setSending(false)
            alert('Falha ao enviar estado atual de saúde, tente novamente!')
        }
    }

    return (
        <section className="modal">
            <section>
                <button className="close-button" onClick={closeModal}>X</button>
                {sending ?
                    <form>
                        <h2 className='sending-message'>Enviando...</h2>
                    </form>
                :
                    <form> 
                        <h2>Está se sentindo bem?</h2>
                        <h3>Se estiver com algum síntoma, marque a seguir</h3>
                        <div className="fieldset">                        
                            <Toggle 
                                title="Febre"
                                setState={setFever}
                                state={fever}
                            />                 
                            <Toggle 
                                title="Tosse"
                                setState={setCough}
                                state={cough}
                            />
                            <Toggle 
                                title="Perda de olfato/paladar"
                                setState={setSmell}
                                state={smell}
                            />
                            <Toggle 
                                title="Coriza"
                                setState={setCoryza}
                                state={coryza}
                            />
                            <Toggle 
                                title="Fadiga"
                                setState={setFatigue}
                                state={fatigue}
                            />
                            <Toggle 
                                title="Falta de apetite"
                                setState={setAnorexia}
                                state={anorexia}
                            />
                            <Toggle 
                                title="Dor no peito"
                                setState={setChestPain}
                                state={chestPain}
                            />
                            <Toggle 
                                title="Falta de ar"
                                setState={setBreathe}
                                state={breathe}
                            />
                            <Toggle 
                                title="Dor no corpo"
                                setState={setPain}
                                state={pain}
                            />
                            <Toggle 
                                title="Náuse / Vômito"
                                setState={setNause}
                                state={nause}
                            />                        
                        </div>
                        <Toggle 
                            title="Caso confirmado"
                            setState={setConfirmation}
                            state={confirmation}
                        />
                        <h2>Localização anonimizada</h2>
                        <h3>Não se esqueça de informar sua cidade</h3>
                        <LocationInput 
                            state={city}
                            setState={setCity}
                        />                        
                        <div className="fieldset-2">
                            <input 
                                type="number" 
                                placeholder="Latitude"
                                value={latitude}
                                onChange={e=>setLatitude(e.target.value)}
                            />
                            <input 
                                type="number" 
                                placeholder="Longitude"
                                value={longitude}
                                onChange={e=>setLongitude(e.target.value)}
                            />
                        </div>
                    </form> 
                }
                   
                {city === '' ?
                    <button disabled='true' className='disabled-button'>Cadastrar</button> :
                    <button onClick={newCaseHandler}>Cadastrar</button>
                }                                       
            </section>
        </section>
    )
}

export default Modal
