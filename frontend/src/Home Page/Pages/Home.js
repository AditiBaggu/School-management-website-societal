import React from 'react'
import Navbar from "../Components/Navbar.js"
import Missviss from '../Components/Missviss.js'
import Box from '../Components/Box.js'
import Footer from '../Components/Footer.js'
import Picture from '../Components/Picture.js'
import Admissionbar from '../Components/Admissionbar.js'
import EventGallery from '../Components/EventGallery.js'

const Home = () =>{
    return(
        <div className="Home">
        <Admissionbar/>
        <Box />
        <Missviss />
        <Picture/>
        <EventGallery/>
        <Footer />
        </div>
    )
}

export default Home