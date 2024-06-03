import React from 'react';
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-white shadow-md'>
        {/**
         * les paramètres permettent de :
            * text-sm : rendre petits sur téléphone, 
            * sm:text-xl : plus grands sur d'autres platformes, 
            * flex : près l'un de l'autre
            * justify-between : add space between elements
            * items-center : afficher verticalement
            * hidden sm:inline : cacher l'élément lorsque la taille de la fenètre est réduite
         *
         * <link> </Link> permet de renvoyer vers une autre page sans avoir à recharger la page 
        */}
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                    
                    {/*Titre*/}
            <Link to='/'>
                <div className='font-bold text-sm sm:text-xl flex flex-wrap items-center'>
                    <div className='flex items-center justify-center bg-blue-300 w-10 h-14'>
                        <span className='text-white font-bold'>LL</span>
                    </div>

                    <h1>
                        <span className='text-green-300'>
                            Land
                        </span>
                        <span className='text-green-950'>
                            Lord
                        </span>
                    </h1>
                </div>
            </Link>

                    {/*Barre de recherche*/}
            <form className='bg-gray-100 p-3 rounded-lg flex items-center'>
                <input 
                    type="text" 
                    placeholder='Search...' 
                    className='bg-transparent focus:outline-none w-28 sm:w-80'
                />

                <FaSearch className='text-slate-900'/>
            </form>

                    {/*Liste des liens*/}
            <ul className='flex gap-5'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-800 hover:underline cursor-pointer'>Home</li>
                </Link>

                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-800 hover:underline cursor-pointer'>About</li>
                </Link>

                <Link to='/sign-in'>
                    <li className='hover:underline cursor-pointer'>Sign in</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
