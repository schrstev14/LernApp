import React from 'react';
import { Button, Container, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

const HomePage = () => {
    const user = useTracker(() => Meteor.user());
    const history = useHistory();
    return (
        <Container text style={{ textAlign: 'center' }}>
            {user ? (
                <div>
                    <h1 style={{ textDecoration: 'underline' }}>Welcome "{user.username}"</h1>
                    <Container text>
                        You have the Roles: {Roles.getRolesForUser(user).map((roles) => <>| {roles} |</>)}
                    </Container>
                </div>

            ) : (
                    <div>
                        <h1 style={{ textDecoration: 'underline' }} onClick={() => history.push('/login')}>Please LogIn to your Account or SignUp</h1>
                    </div>
                )}
            <Button circular onClick={() => history.push('/courses')}>Aktuelle Course<Icon name='arrow right'/></Button>
        </Container>
    )
}

export default HomePage