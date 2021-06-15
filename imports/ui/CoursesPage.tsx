import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { useHistory, useParams } from 'react-router-dom'
import { Item, Container, Progress, Button } from 'semantic-ui-react'
import { CourseCollection } from '../api/CourseCollection';

const CoursePage = ({editMode} : {editMode: boolean}) => {
  const history = useHistory();
  const courses = useTracker(() => CourseCollection.find().map((course) => (

    <Item onClick={() => history.push(`/current-course/${course._id}`)}>
      <Item.Image size='tiny' src={course.imageURL} />

      <Item.Content>
        <Item.Header as='a'>{course.title}</Item.Header>
        <Item.Description>
        {course.description}
        </Item.Description>
        {/* <Item.Extra><Progress value='0' total='5' progress='percent' /></Item.Extra> */}
      </Item.Content>
    </Item>
  )))

  return (
    <div style={{ padding: '1rem' }} >
      <Container text>
      <Item.Group>
        {
          editMode ? <Button>+</Button> : null
        }
            {courses}
        </Item.Group>
      </Container>
    </div>
  )
}

export default CoursePage;