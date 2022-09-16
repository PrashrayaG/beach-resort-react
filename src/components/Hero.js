import React from 'react'

export default function Hero({children, hero}) {
  return (
    <header className={hero}>
     {children}
    </header>
  )
}

Hero.defaultProps = {
 hero: 'defaultHero' //defaultHero is a class in APP.css 
}