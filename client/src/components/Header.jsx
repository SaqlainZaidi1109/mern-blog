import React from 'react'
import { Navbar, TextInput, Button } from "flowbite-react";
import {Link, useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'


export default function Header() {
  const path = useLocation().pathname; //in-order to active Home, about and projects
  return (
    
    <Navbar className='border-b-2 self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            {/* <img src="https://static.vecteezy.com/system/resources/previews/013/643/516/large_2x/colorfull-letter-z-in-3d-style-text-effect-free-png.png" class="h-8" alt="Flowbite Logo" /> */}
        <Link className=''>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >Zendrix</span>Blogs
        </Link>

        <form>
          <TextInput
                type='text'
                placeholder='Search'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>

        <Button className='w-12 h-10 lg:hidden' color='gray' pill><AiOutlineSearch/></Button>

        <div className='flex gap-2 md:order-2'>
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
            <FaMoon/>
          </Button>
          
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
          <Navbar.Toggle/>
        </div>
          
          <Navbar.Collapse>
            <Navbar.Link active={path==="/"} as={'div'}>
              <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path==="/about"} as={'div'}>
              <Link to='/about' >About</Link>
            </Navbar.Link >
            <Navbar.Link active={path==="/projects"} as={'div'}>
              <Link to='/projects'>Projects</Link>
            </Navbar.Link>
          </Navbar.Collapse>

    </Navbar>

  )
}
{/* <img src="https://static.vecteezy.com/system/resources/previews/013/643/516/large_2x/colorfull-letter-z-in-3d-style-text-effect-free-png.png" class="h-8" alt="Flowbite Logo" /> */}
// as={'div'} to avoid error: <Navbar.Link> creates an anchor tag and <Link> creates it aswell, so two anchor tags are not allowrd inside each other
// Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
//     at a
//     at LinkWithRef (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=f7503a7b:4778:5)
//     at a
//     at li
//     at NavbarLink (http://localhost:5173/node_modules/.vite/deps/flowbite-react.js?v=f7503a7b:12272:3)
//     at ul
//     at div
//     at NavbarCollapse (http://localhost:5173/node_modules/.vite/deps/flowbite-react.js?v=f7503a7b:12255:25)
//     at div
//     at nav
//     at NavbarComponent (http://localhost:5173/node_modules/.vite/deps/flowbite-react.js?v=f7503a7b:12334:3)
//     at Header (http://localhost:5173/src/components/Header.jsx?t=1712607582662:18:18)
//     at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=f7503a7b:3936:15)
//     at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=f7503a7b:4676:5)
//     at App