import React, { Component } from 'react'

import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';

import StyledHero from '../components/StyledHero';

export default class SingleRoom extends Component {

  constructor(props) {
    super(props)
    // console.log(this.props);
    this.state ={
      slug:this.props.match.params.slug,
      defaultBcg
    }
  }
  // componentDidMount() {}

  static contextType = RoomContext;

  render() {
    const {getRoom} = this.context;
    const room = getRoom(this.state.slug);
    // console.log(room)

    // if the room is undefined
    if(!room) {
      return <div className="error">
        <h3>No such room is found...</h3>
        <Link to='/rooms' className='btn-primary'>
          Back to rooms
        </Link>
      </div>
    }

    // if the room is defined
    const {name,
      description, 
      capacity, 
      size, 
      price,
      extras, 
      breakfast, 
      pets, 
      images
    } = room;

    // array destructing instead of object 
    // for showing 3 images instead of 4 in single room

    const [mainImg,...defaultImg] = images;
    console.log(defaultImg)
    return (
      <>
      {/* <StyledHero img={images[0] || this.state.defaultBcg}> */}
      <StyledHero img={mainImg || this.state.defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to='/rooms' className='btn-primary'>
            Back to rooms
          </Link>
        </Banner>
      </StyledHero>

      <section className="single-room">
        <div className="single-room-images">
          {/* {images.map((item,index)=> { */}
          {defaultImg.map((item,index)=> {
            return <img key={index} src={item} alt={name} />
          })}
        </div>

        <div className="single-room-info">
          <article className="desc">
            <h3>Details</h3>
            <p>{description}</p>
          </article>

          <article className="info">
            <h3>info</h3>
            <h6>price: Rs.{price}</h6>
            <h6>size: {size} sq.ft</h6>

            <h6>
              max capacity : {
                capacity > 1 ? `${capacity} people` : `${capacity} person`  // if the capacity is more than 1 add people. if 1, then add person
              }
            </h6>

            <h6>
               {pets?'pets allowed': 'pets not allowed'} {/* if pets is true on data.js show pets allowed  */}
            </h6>

            <h6>
              {breakfast && 'free breakfast included'}
            </h6>
          </article>
        </div>
      </section>

      {/* for the extras */}
      <section className="room-extras">
        <h6>Extras</h6>
        <ul className="extras">
          {extras.map((item, index)=> {
            return <li key={index}>
              - {item}
            </li>
          })}
        </ul>
      </section>
      </>
    )
  }
}

