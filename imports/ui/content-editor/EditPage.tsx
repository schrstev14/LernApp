import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Button, ButtonGroup, List, Loader, Icon, Modal, Container, Message } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { editCourseId, CourseCollection } from '/imports/api/CourseCollection'
import TopicList from './TopicList'
import CourseEditor from './CourseEditor'

const EditPage = () => {
  const user = useTracker(() => Meteor.user());

  const { id } = useParams()
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Courses')
    return !handle.ready()
  })

  function remove(id) {
    //@ts-ignore
    Meteor.callAsync('courseremove', id)
  }

  const courses = useTracker(() => CourseCollection.find({}).map((course) => {
    if (isLoading) { return <div><Loader>Loading</Loader></div> }
    return (

      <List.Item key={course._id}>
        <Modal
          trigger={<Button circular positive onClick={() => editCourseId.set('0')}>Course <Icon name='add' circular size='small' /></Button>}
          header={editCourseId.get() != '0' ? ('Edit Course') : ('New Course')}
          content={<CourseEditor />}
        />
        <List.Content>
          <List.Content>
            <ButtonGroup floated='right'>
              <Modal
                trigger={<Button circular negative>{course.title} <Icon name='delete' circular size='small' /></Button>}
                header={'Notification'}
                content={'You really want to delete this'}
                actions={['abort', { key: 'done', content: 'Yes', positive: true, onClick: () => remove(course._id) }]}
              />
              <Modal
                trigger={<Button circular primary onClick={() => editCourseId.set(course._id)}>{course.title} <Icon name='edit' circular size='small' /></Button>}
                header={editCourseId.get() != '0' ? ('Edit Course') : ('New Course')}
                content={<CourseEditor />}
              />
            </ButtonGroup >
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
        <Container text style={{ flexGrow: 1, padding: '1rem', display: 'flex' }}>
          <div style={{ width: '45rem' }}>
            <List divided verticalAlign='middle' >  {/* style={{borderStyle: 'solid', borderWidth:'2px', padding:'0.5rem', borderRadius: '3px'}} */}
              {courses}
            </List>
          </div>
        </Container>
      ) : (
        <div style={{ backgroundColor: 'red', textAlign: 'center'}}>
          <Message
            icon='delete'
            header='Not Allowed'
            content='You dont have the Permission to do something'
          />
          <h1>Nothing for you</h1>
        </div>
      )}
    </div>
  )
}


export default EditPage