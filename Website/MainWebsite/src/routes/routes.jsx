import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Lander from '../pages/Lander';
import Notes from '../pages/Notes';
import Mcq from '../pages/Mcq';
import Time from '../pages/TimeManagement';

function routes() {
    return (
       
       <Routes>
        <Route path='/' element={<Lander />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/mcq' element={<Mcq />} />
        <Route path='/time' element={<Time />} />
       </Routes>
       )
    }
    
    export default routes;