import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { Button, Modal, List, Item } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { CourseCollection } from '../api/CourseCollection'
import MarkdownEditorPage from '/imports/ui/MarkdownEditor/MarkdownEditorPage'
import TopicList from './TopicList'

//verschachtelte Listen + buttons (+ | edit) -> semantic ui model, 

const EditPage = () => {
  const { id } = useParams()

  const courses = useTracker(() => CourseCollection.find({}).map((course) =>

    <List.Item>
      <List.Content>
        <List.Header>{course.title}</List.Header>
        <List.Description>{course.description}</List.Description>
        <List.Content floated='right'>
        <Button primary>Topic@+</Button>
          <Button secondary>Course@Edit</Button>
        </List.Content>
        <div style={{ paddingLeft: '1rem' }}>
          <List.List>
            <TopicList courseId={course._id}></TopicList>
          </List.List>
        </div>
      </List.Content>
    </List.Item>
  ))

  return (
    <div style={{ flexGrow: 1, padding: '1rem', display: 'flex' }} >

      <div style={{ width: '20rem', marginRight: '10rem' }}>

        <List divided verticalAlign='middle'>
          <Button primary>Course@+</Button>
          {courses}
        </List>
      </div>
      <div>
        <MarkdownEditorPage />
      </div>
    </div>
  )
}

export default EditPage