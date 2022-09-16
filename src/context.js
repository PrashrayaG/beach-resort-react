import React, { Component } from 'react'

// import items from './data'

import Client from './Contentful'

const RoomContext = React.createContext();

// RoomContext.Provider value = {'hi}

 class RoomProvider extends Component {

  state = {
   rooms: [], // coming from data.js
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: 'false',
    pets: 'false'
  };

  // get data from contentful
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: 'beachResort',
        order: 'sys.createdAt' // grouped by data created date
        // order: 'fields.price' // grouped by price
        // order: '-fields.price' // negative(descneding order)
      });

    let rooms = this.formatData(response.items)
    let featuredRooms = rooms.filter(room => room.featured === true); // each and every room, if room featured. if prop is equal to true then that will be added to this featured rooms array


    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));


    this.setState({
      rooms,
      featuredRooms, 
      sortedRooms:rooms, 
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    })


      } catch (error) {
        console.log(error)
      }
    }

  componentDidMount() {
  this.getData();

}

formatData(items) {
  let tempItems = items.map(item => {

    let id = item.sys.id
    let images = item.fields.images.map(image => image.fields.file.url); // since images are in fields in data.js

    let room = {...item.fields, images, id} // id is within sys on data.js not on fields
    return room;

  });
  return tempItems
}

getRoom = (slug) => {
  let tempRooms = [...this.state.rooms];
  const room = tempRooms.find ((room)=> room.slug=== slug);
  return room;
};

handleChange = event => {
  const target = event.target

  const value = target.type === 'checkbox' ? target.checked : target.value
  const name = event.target.name
  console.log(name, value, target.type)

  this.setState({
    [name]: value
  }, this.filterRooms)
  
}

filterRooms = ()=>{
  let {
    rooms, 
    type, 
    capacity, 
    price, 
    minSize, 
    maxSize, 
    breakfast, 
    pets 
  } = this.state
  
  // all the rooms
  let tempRooms = [...rooms];

  // transform the value (change string to number)
  // capacity(guest), price will be in string. we need it to be in numbers so that we can filter rooms based on number of guests
  capacity = parseInt(capacity);
  price = parseInt(price);


// filtering by type
  if(type !== 'all') {
    tempRooms = tempRooms.filter(room => room.type === type)
  }

  // filtering by capacity
  if(capacity !==1) {
    tempRooms= tempRooms.filter(room => room.capacity >=capacity) // if capacity is 1, dont touch. if capacity is bigger (eg. 2) then return only room that have capacity prop bigger or equal to 2
  }

  // filtering by price
  tempRooms = tempRooms.filter(room => room.price <=price); // if room price is less than the price that we have in range then that room will be displayed . for e.g. if in the range, room price is 401 then rooms whose price is below 401 will be displayed

  // filtering by room size (in sq. ft)
  tempRooms = tempRooms.filter(room => room.size >=minSize && room.size <= maxSize)

  // filtering by breakfast
  if(breakfast) {   // if breakfast is true
    tempRooms = tempRooms.filter(room => room.breakfast === true) // then return only the rooms that serve breakfast
  } 
    

  // filtering by pets
 if(pets) {   // if pets is true
    tempRooms = tempRooms.filter(room => room.pets === true) // then return only the rooms that allow pets
  } 

  // change state
  this.setState({
    sortedRooms: tempRooms
  })
}

  render() {
    return (
      <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange:this.handleChange}}> 
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;


export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return <RoomConsumer>
      {value => <Component {...props} context={value}/>}
    </RoomConsumer>
  }
}

export {RoomProvider, RoomConsumer, RoomContext};
