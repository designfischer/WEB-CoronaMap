import React from 'react'

function Toggle({ title, setState, state }) {

        function changeState(e) {
            e.preventDefault()
            setState(!state)
        }
       
        return (
        <button onClick={changeState} className={ state ? "toggle-button-active" : "toggle-button-unactive"}>
            {title}
        </button>
    )    
}

export default Toggle