import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import Ghosts from './ghosts.png'
import gengar from './gengar.png'

import './index.css'

export default function NotFoundPage({ err }) {
    return (
        <Box className="notFoundPage">
            <>
                <Typography variant='h2' className='title'>
                    The page does not exist
                    <Link to={"/Search"}><img src={gengar} width="50rem" alt='Fantasmas' /></Link>
                    <p style={{ color: '#F7B6B6', fontSize: '2rem' }}>err:404</p>
                </Typography>
                <Typography variant='h6' className='title'>
                    <Link to={"/"}>
                        Redirecionar para home !
                    </Link>
                </Typography>
            </>


            <img src={Ghosts} width="500rem" alt='Fantasmas' />
        </Box>
    )
}

