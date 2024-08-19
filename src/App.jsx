import React from 'react'
import Navbar from './component/Navbar/Navbar'
import SearchArea from './component/SearchArea/SearchArea'
import MovieData from './component/MovieData/MovieData'

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <MovieData />
    </div>
  )
}

export default App