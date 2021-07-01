import React from 'react';
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { useHistory } from 'react-router-dom'
import { Item, Container, Loader } from 'semantic-ui-react'
import { CourseCollection } from '../api/CourseCollection';

const CoursePage = () => {
  const history = useHistory();
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Courses')
    return !handle.ready()
  })


  const courses = useTracker(() => CourseCollection.find().map((course) => {
    return(
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
    )}
  ))

  if (isLoading) { return <div><Loader>Loading</Loader></div> }
  return (
    <div style={{ padding: '1rem', backgroundColor: 'pinkl'}} >
      <Container text>
        <Item.Group divided>
          {courses}
        </Item.Group>
      </Container>
    </div>
  )
}

export default CoursePage;