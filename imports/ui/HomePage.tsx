import React, {useState} from 'react';
import {Button} from 'semantic-ui-react'
import { CourseCollection } from '../api/CourseCollection';

function handleClick(){
    CourseCollection.insert({
        title: 'Test',
        description: 'Test Nummer 2'
    })
}

const HomePage = () =>{
    return(
    <div>
        <h1>Comming Soon</h1>
        <Button onClick={handleClick}>Test</Button>
    </div>
    )
}

export default HomePage