import React, { Component } from 'react'

import logo from '../images/logo.svg'

import {FaAlignRight} from 'react-icons/fa'

import { Link } from 'react-router-dom'

export default class Navbar extends Component {

 state = {
  isOpen: false // by default, navabr will not open
 } 

 handleToggle = () => {
  this.setState({isOpen: !this.state.isOpen}) // toggling btn false and true
 }

  render() {
    return (
      <nav className='navbar'>
       <div className="nav-center">
        <div className="nav-header">

         <Link to='/'>
          <img src={logo} alt="beach-logo" />
         </Link>

         <button type='button' className='nav-btn'
         onClick={this.handleToggle}>
          <FaAlignRight className='nav-icon'/>
         </button>

        </div>

        <ul className={this.state.isOpen?'nav-links show-nav' : 'nav-links'}> {/* if the prop is true (if it is open) then class will be nav-links show-nav. if it is false, only show nav-links.
        in app.css, show-nav have height = 100px. so when we toggle we get the height is added and links are shown 
         */}

         <li>
          <Link to='./'>Home</Link>
         </li>

         <li>
          <Link to='./rooms'>Rooms</Link>
         </li>

        </ul> 
       </div>
       </nav>
    )
  }
}
