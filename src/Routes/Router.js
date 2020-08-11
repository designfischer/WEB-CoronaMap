import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../Pages/Home/Home'
import Map from '../Pages/Map/Map'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/map' exact component={Map} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router
