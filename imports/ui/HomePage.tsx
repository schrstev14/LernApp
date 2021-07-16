import React, { Fragment } from 'react';
import { Button, Container, Icon, Loader, Item, Label, Popup } from 'semantic-ui-react'
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
                </Item.Content>
            </Item>
        )
    }
    ))

    if (isLoadingLastVisited || isLoadingCourses) { return <div><Loader>Loading</Loader></div> }
    return (
        <Container text style={{ textAlign: 'center' }}>
            <Fragment>
                {user ? (
                    <div>
                        <h1 className='Title'>Welcome {user.username}</h1>
                        <h3>
                            You have the Roles: <br />{Roles.getRolesForUser(user).map((roles) => <Label color='black' style={{ fontSize: '95%' }} key={roles.key}> {roles} </Label>)}
                        </h3>
                        {course.length != 0 ? (
                            <div>
                                <br />
                                <h3>Last visited Course:</h3>
                                <h3 className='Course'>{course}</h3>
                            </div>
                        ) : ('Kein letzter Course')}
                    </div>
                ) : (
                    <div>
                        <h1>Please LogIn to your Account or SignUp</h1>
                        <h1 style={{ textDecoration: 'underline', color: 'blue' }} onClick={() => history.push('/login')}>Click Here</h1>
                    </div>
                )}
            </Fragment>
            <br />
            <Popup content='Go To All Courses' trigger={
                <Button positive circular onClick={() => history.push('/courses')}>All Courses<Icon name='arrow right' /></Button>
            } />
        </Container>
    )
}

export default HomePage