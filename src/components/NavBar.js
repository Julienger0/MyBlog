import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(){
    return(
        <nav className='text-center mb-5 border-bottom border-dark border-2'>
        <ul className="list-unstyled list-inline aa">
            <li className='list-inline-item'>
                <Link className='link fs-3 me-3' to="/">Accueil</Link>

            </li>

            <li className='list-inline-item'>
            <Link className='link fs-3' to="/articleslist">Articles</Link>

            </li>
        </ul>
    </nav>
    )
    
};

export default NavBar;