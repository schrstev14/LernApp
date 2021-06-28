import React, { useState } from 'react';
import { Button } from 'semantic-ui-react'
import { CourseCollection } from '../api/CourseCollection';

import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

const HomePage = () => {
    const user = useTracker(() => Meteor.user());
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome {user?.username}</h1>
            <h3>
                You have the Roles: {Roles.getRolesForUser(user)}
            </h3>
        </div>
    )
}

export default HomePage