import { Link } from 'react-router-dom';
import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';
import { GiMeal } from 'react-icons/gi'; // Importa el icono desde react-icons

export default function Footer() {
    return (
        <footer className=' text-center text-black bg-light text-lg-left p-0 fixed-bottom mx-auto'>
            <div className='text-center' >
                &copy; {new Date().getFullYear()} Copyright.{' '}
                <GiMeal size={40} className='text-dark p-1 m-1' />
            </div>
        </footer>
    );
}

