import React, { useState, useEffect } from 'react'

function MarkerContent({
    confirmation,
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
    created_at,
    city
}) {
    const [createdAt, setCreatedAt] = useState(null)

    useEffect(()=> {formatDate()}, [])

    function formatDate() {
        const date = Date(created_at)
        const formattedDate = Date(date).toString()
        setCreatedAt(formattedDate)
    }

    return (
        <div className='marker'>                        
            <h2>Confirmado: {confirmation ? 'Sim' : 'Não'}</h2>                                                                      
            <h3>Sintomas</h3>                        
            <ul>
                <li className={fever ? 'li-confirmed' : undefined}>
                    <p>Febre</p>
                </li>
                <li className={cough ? 'li-confirmed' : undefined}>
                    <p>Tosse</p>
                </li>
                <li className={smell ? 'li-confirmed' : undefined}>
                    <p>Perde de olfato / paladar</p>
                </li>
                <li className={fatigue ? 'li-confirmed' : undefined}>
                    <p>Fadiga</p>
                </li>
                <li className={coryza ? 'li-confirmed' : undefined}>
                    <p>Coriza</p>
                </li>
                <li className={anorexia ? 'li-confirmed' : undefined}>
                    <p>Falta de apetite</p>
                </li>
                <li className={chestPain ? 'li-confirmed' : undefined}>
                    <p>Dor no peito</p>
                </li>
                <li className={breathe ? 'li-confirmed' : undefined}>
                    <p>Falta de ar</p>
                </li>
                <li className={pain ? 'li-confirmed' : undefined}>
                    <p>Dor no corpo</p>
                </li>
                <li className={nause ? 'li-confirmed' : undefined}>
                    <p>Náusea</p>
                </li>
            </ul>                         
                                               
            <h3>{city}, {createdAt}</h3>
        </div>
    )
}

export default MarkerContent
