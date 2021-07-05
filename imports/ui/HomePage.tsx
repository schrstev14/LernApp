import React from 'react';
import { Button, Container, Icon, Loader, Item } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { LastVisitCollection } from '/imports/api/LastVisitCollection';
import { CourseCollection } from '/imports/api/CourseCollection';

const HomePage = () => {
    const user = useTracker(() => Meteor.user());
    const history = useHistory();
    const LastVisited = LastVisitCollection.findOne({ userId: user?._id })

    const isLoadingLastVisited = useTracker(() => {
        const handle = Meteor.subscribe('LastVisited')
        return !handle.ready()
    })

    const isLoadingCourses = useTracker(() => {
        const handle = Meteor.subscribe('Courses')
        return !handle.ready()
    })

    const course = useTracker(() => CourseCollection.find(LastVisited?.courseId).map((course) => {
        return (
            <Item key={course._id} onClick={() => history.push(`/current-course/${course._id}`)}>
                <Item.Image size='tiny' src={course.imageURL} />

                <Item.Content>
                    <Item.Header as='a'>{course.title}</Item.Header>
                    <Item.Description>
                        {course.description}
                    </Item.Description>
                    {/* <Item.Extra><Progress value='0' total='5' progress='percent' /></Item.Extra> */}
                </Item.Content>
            </Item>
        )
    }
    ))

    if (isLoadingLastVisited || isLoadingCourses) { return <div><Loader>Loading</Loader></div> }
    return (
        <Container text style={{ textAlign: 'center' }}>
            {user ? (
                <div>
                    <h1 style={{ textDecoration: 'underline' }}>Welcome "{user.username}"</h1>
                    <Container text>
                        You have the Roles: {Roles.getRolesForUser(user).map((roles) => <>| {roles} |</>)}
                    </Container>
                   {course.length != 0 ? (<h3>Zuletzt Besuchter Course:{course}</h3>): ('Kein letzter Course')}
                </div>
            ) : (
                <div>
                    <h1>Please LogIn to your Account or SignUp</h1>
                    <h1 style={{ textDecoration: 'underline' , color: 'blue'}} onClick={() => history.push('/login')}>Click Here</h1>
                </div>
            )}
            <Button circular onClick={() => history.push('/courses')}>Alle Course<Icon name='arrow right' /></Button>
        </Container>
    )
}

export default HomePage