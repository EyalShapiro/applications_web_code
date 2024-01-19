import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import Ghosts from './assets/ghosts.png'
import gengar from './assets/gengar.png'

import './assets/index.css'

export default function NotFoundPage() {
    const errStyle = { color: '#F7B6B6', fontSize: '2rem', textAlign: 'center', margin: '10px' }
    const homeStyle = { textDecoration: 'none', color: 'white', backgroundColor: "red", padding: "10px", borderRadius: "10px" }
    return (
        <Box className="notFoundPage">
            <Typography variant='h1' className='title'>
                The page does not exist

                <Link to={"/Search"} ><img src={gengar} width="70rem" /></Link>
                <p style={errStyle}>err:404</p>
            </Typography>
            <Typography variant='h2'>
                <Link to={"/"}
                    style={homeStyle}
                    color="danger"
                    underline="hover"
                    variant="solid">
                    Go home !
                </Link>
            </Typography>


            <img src={Ghosts} width="500rem" alt='Fantasmas' />
        </Box>
    )
}

