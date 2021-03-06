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
    return (
      <List.Item key={course._id} style={{ paddingTop: '1em', paddingBottom: '1em' }}>
        <Modal
          trigger={<Button circular positive onClick={() => editCourseId.set('0')}>Course <Icon name='add' circular size='small' /></Button>}
          header={editCourseId.get() != '0' ? ('Edit Course') : ('New Course')}
          content={<CourseEditor />}
        />
        <List.Content style={{ paddingTop: '0.75em', paddingBottom: '0.5em' }}>
          <List.Content>
            <ButtonGroup floated='right'>
              <Modal
                trigger={<Button circular negative>{course.title} <Icon name='delete' circular size='small' /></Button>}
                header={'Warning'}
                content={'You really want to delete this ?'}
                actions={[{ key: 'not', content: 'abort', negative: true }, { key: 'done', content: 'Yes', positive: true, onClick: () => remove(course._id) }]}
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
  if (isLoading) { return <div><Loader>Loading</Loader></div> }
  return (
    <div  >
      {Roles.userIsInRole(user, ['EDIT']) ? (
        <Container text style={{ flexGrow: 1, padding: '1rem', display: 'flex' }}>
          <div style={{ width: '45rem' }}>
            <List divided verticalAlign='middle' >  {/* style={{borderStyle: 'solid', borderWidth:'2px', padding:'0.5rem', borderRadius: '3px'}} */}
              <h1 className='Title'>Edit Page</h1>
              {courses}
            </List>
          </div>
        </Container>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Message
            negative
            color='red'
            icon='delete'
            header='Not Allowed'
            content='You dont have the Permission to do something'
          />
          <h1>Here is Nothing for you</h1>
        </div>
      )}
    </div>
  )
}


export default EditPage