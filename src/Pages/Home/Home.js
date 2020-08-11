import React, { useEffect, useState } from 'react'

import api from '../../Services/api'
import SocialDistancing from '../../Assets/social-distancing.svg'

import Modal from '../../Components/Modal/Modal'

function Home() {
    const [brazilCoronaData, setBrazilCoronaData] = useState([])

    useEffect(() => {getCoronaData()}, [])

    async function getCoronaData() {
        const coronaData = await api.get('/brazil')
        const { data } = coronaData        
        setBrazilCoronaData(data.data)
    }
    
    const [isModalOpen, setModalOpen] = useState(false)

    function openModal(e) {
        e.preventDefault()
        setModalOpen(true)
    }
    
    function closeModal(e) {
        e.preventDefault()
        setModalOpen(false)
    }

    return (
        <>
            <nav>                
                <h1>Corona Map</h1>                
            </nav>
            <main>                
                <div className="container">
                    <img src={SocialDistancing} alt="CoronavirupsMAP"/>
                        
                </div>
                <div className="container">
                    <h1>Corona Map</h1>
                        {brazilCoronaData.length === 0 ? 
                            <>
                                <h2>Milhares de casos no Brasil</h2>
                                <h2>Milhares de óbitos.</h2>
                            </> : 
                            <>
                                <h2>{brazilCoronaData.cases} casos no Brasil</h2>
                                <h2>{brazilCoronaData.deaths} óbitos.</h2>
                            </>                            
                        }                                     
                    <h3>Conte como você se sente de maneira anonima e saiba mais sobre os síntomas do COVID-19 e o estado de saúde de pessoas ao seu redor</h3>
                    <button onClick={openModal}>Participar</button>
                </div>                
            </main>
            <footer>
                <h2>O CoronavirusMAP não armazena nenhum dado pessoal de seus usuários.</h2>
                <h3>Todas as informações são anonimizadas para garantir sua privacidade.</h3>
            </footer>

            {isModalOpen &&
                <Modal closeModal={closeModal}/>
            }            
        </>
    )
}

export default Home
