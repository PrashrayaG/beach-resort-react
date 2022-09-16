import React from 'react'

import { useContext } from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'

// get all unique values for room type filtering
const getUnique = (items, value) => {
 return [...new Set(items.map(item => item[value]))]
}

export default function RoomsFilter({rooms}) {

 const context = useContext(RoomContext);

 const {
  handleChange, 
  type, 
  capacity, 
  price, 
  minPrice, 
  maxPrice, 
  minSize, 
  maxSize, 
  breakfast, 
  pets 
 } = context;

 // get unique types
let types = getUnique(rooms, 'type');
// add all
types = ['all', ...types];
// map to jsx
types = types.map((item, index)=> {
 return <option value={item} key={index}>{item}</option>
})

let people = getUnique(rooms, 'capacity');
people = people.map((item, index)=> {
  return <option key={index} value={item}>
    {item}
  </option>
})

  return (
    <section className="filter-container">
     <Title title='search rooms'/>

     <form  className="filter-form">

     {/* start of select type */}
     <div className="form-group">
      <label htmlFor="type">Room Type</label>
      <select 
      name="type" 
      id="type" 
      value={type} 
      className='form-control' 
      onChange={handleChange} >
        
       {types}
      </select>
      </div>
     {/* end of select type  */}

      {/* start of guests  */}
     <div className="form-group">
      <label htmlFor="capacity">Guest</label>
      <select 
      name="capacity" 
      id="apacity" 
      value={capacity} 
      className='form-control' 
      onChange={handleChange} >

       {people}
      </select>
     </div>
     {/* end of guests   */}

      {/* filtering by room price */}
      <div className="form-group">
        <label htmlFor="price">
          Room Price Rs.{price}
        </label>

        <input type="range" 
        name='price' 
        min={minPrice} 
        max={maxPrice} 
        id='price' 
        value={price} 
        onChange={handleChange} 
         className='form-control' />
      </div>
      {/* end of room price */}

      {/* start of filtering by size */}
      <div className="form-group">
        <label htmlFor="size"> Room Size</label>

        <div className="size-inputs">

          {/* for minSize */}
          <input type="number" 
          name="minSize" 
          id="size" 
          value={minSize} 
          onChange={handleChange} 
          className="size-input"/>

           {/* for maxSize */}
          <input type="number" 
          name="maxSize" 
          id="size" 
          value={maxSize} 
          onChange={handleChange} 
          className="size-input"/>
        </div>
      </div>
      {/* end of filtering by size */}

      {/* start of extras */}
      <div className="form-group">
        {/* start of filtering by breakfast */}
        <div className="single-extra">
          <input type="checkbox" 
          name="breakfast" 
          id="breakfast" 
          // checked={breakfast} 
          onChange={handleChange}/>
          <label htmlFor="breakfast">Breakfast</label>
        </div>
          {/* end of filtering by breakfast */}

         
        {/* start of filtering by pets */}
        <div className="single-extra">
          <input type="checkbox" 
          name="pets" 
          id="pets" 
          // checked={pets} 
          onChange={handleChange}/>
          <label htmlFor="pets">pets</label>
        </div>
          {/* end of filtering by pets */}
      </div>
      {/* end of extras */}

     </form>
    </section>
  )
}
