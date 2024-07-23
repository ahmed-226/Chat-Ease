import React from 'react'

const NavBar = () => {
    return (
        <div>
            <header className='flex justify-center items-center py-3 h-[130px] shadow-md bg-white'>
                <img
                    src='/logo.avif'
                    alt='logo'
                    width={130}
                    // height={0}
                />
            </header>
        </div>
    )
}

export default NavBar
