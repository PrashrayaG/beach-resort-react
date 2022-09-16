import React from 'react'

import { Link } from 'react-router-dom'

import defaultImg from '../images/room-1.jpeg'

import PropTypes from 'prop-types';

export default function Room({room}) {
  const {name, slug, images, price} = room; // room is destructured


  return (
    <article className='room'>
      <div className="img-container">
         <img src={images[0] || defaultImg} alt="single room" /> {/* images are in array so [0] is used. also if the img is not there so default image */}

         <div className="price-top">
          <h6>Rs.{price}</h6>
          <p>per night</p>
         </div>
{/* link to guide to sinlge page */}
         <Link to={`/rooms/${slug}`} className='btn-primary room-link' >
          Features
          </Link>
      </div>

      <p className='room-info'>{name}</p>
    </article>
  )
}

Room.protoTypes = {
  room: PropTypes.shape({
    name:PropTypes.string.isRequired,
    slug:PropTypes.string.isRequired,
    images:PropTypes.arrayOf(PropTypes.string).isRequired,
    price:PropTypes.number.isRequired
  })
}