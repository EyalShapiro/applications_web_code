import React from 'react'
import './load.css'
import './SpinningBall.css'


//https://uiverse.io/adamgiebl/stale-puma-26

export default function Reload() {
    return (<body>
        <div className="loader">
            <span className='pokeball-spin'></span>
        </div>
    </body>)
}
