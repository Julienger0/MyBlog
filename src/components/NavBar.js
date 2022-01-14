import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(){
    return(
        <nav>
        <ul>
            <li>
                <Link to="/">Accueil</Link>

            </li>

            <li>
            <Link to="/articleslist">Articles</Link>

            </li>
        </ul>
    </nav>
    )
    
};

export default NavBar;