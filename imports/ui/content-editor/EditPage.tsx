import React, { useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Button, List, Loader} from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { editCourseId, Course, CourseCollection } from '/imports/api/CourseCollection'
import TopicList from './TopicList'
import TopicEditor from './TopicEditor'
import CourseEditor from './CourseEditor'

//verschachtelte Listen + buttons (+ | edit) -> semantic ui model, 

const EditPage = () => {
  const user = useTracker(() => Meteor.user());

  const { id } = useParams()
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Courses')
    return !handle.ready()
  })

  function remove(id){
    //@ts-ignore
    Meteor.callAsync('courseremove', id)
  }

  const courses = useTracker(() => CourseCollection.find({}).map((course) => {
    if (isLoading) { return <div><Loader>Loading</Loader></div> }
    return (

      <List.Item key={course._id}>
        <Button color={'green'} onClick={() => editCourseId.set('0')}>Course@+</Button>
        <List.Content>
          <List.Content>
            <Button floated='right' color={'red'} onClick={() => remove(course._id)}>{course.title}-Delete</Button>
            <Button floated='right' primary onClick={() => editCourseId.set(course._id)}>{course.title}-Course@Edit</Button>
          </List.Content>
          <List.Header>{course.title}</List.Header>
          <List.Description>{course.description}</List.Description>
          <div style={{ paddingLeft: '1rem' }}>
            <List.List>
              <TopicList courseId={course._id}></TopicList>
            </List.List>
          </div>
        </List.Content>
      </List.Item>
    )

  }))
  return (
    <div  >
      {Roles.userIsInRole(user, ['EDIT']) ? (
        <div style={{ flexGrow: 1, padding: '1rem', display: 'flex' }}>
          <div style={{ width: '35rem', marginRight: '10rem' }}>

            <List divided verticalAlign='middle'>
              {courses}
            </List>
          </div>
          <div>
            <h1 style={{ textDecoration: 'underline' }}>
              CourseEditor
            </h1>
            <CourseEditor />
            <h1 style={{ textDecoration: 'underline' }}>
              TopicEditor
            </h1>
            <TopicEditor />
          </div>
        </div>
      ) : (
          <div style={{ backgroundColor: 'red' }}>
            <h1>Not Allowed</h1>
          </div>
        )}
    </div>
  )
}


export default EditPage