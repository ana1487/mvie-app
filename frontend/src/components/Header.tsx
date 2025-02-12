import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
const Header = () => {
    return (
        <>
            <nav>
                <div className='title'>Movies<span className="bg-color">Hub</span></div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/favourites">Favourites</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Header;
