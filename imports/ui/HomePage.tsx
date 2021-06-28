import React, { useState } from 'react';
import { Button, Container } from 'semantic-ui-react'
import { CourseCollection } from '../api/CourseCollection';
import { useHistory, useLocation } from 'react-router-dom'

import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

const HomePage = () => {
    const user = useTracker(() => Meteor.user());
  const history = useHistory();
    return (
        <Container text  style={{ textAlign: 'center' }}>
            <div>
                <h1  style={{ textDecoration: 'underline' }}>Welcome {user?.username}</h1>
                <h3>
                    You have the Roles: {Roles.getRolesForUser(user)}
                </h3>
            </div>
            <Button onClick={() =>history.push('/courses')}>Aktuelle Course</Button>
        </Container>
    )
}

export default HomePage