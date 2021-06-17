import React, { useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { ReactiveVar } from 'meteor/reactive-var'

import { Button, Modal, List, Item } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { editCourseId,Course, CourseCollection } from '/imports/api/CourseCollection'
import MarkdownEditorWithDisplay from './MarkdownEditor/MarkdownEditorWithDispay'
import TopicList from './TopicList'
import TopicEditor from './TopicEditor'
import CourseEditor from './CourseEditor'

//verschachtelte Listen + buttons (+ | edit) -> semantic ui model, 

const EditPage = () => {


  const { id } = useParams()

  const courses = useTracker(() => CourseCollection.find({}).map((course) =>

    <List.Item>
      <List.Content>
        <List.Content>
          <Button floated='right' secondary onClick={() => editCourseId.set(course._id)}>{course.title}-Course@Edit</Button>
        </List.Content>
        <List.Header>{course.title}</List.Header>
        <List.Description>{course.description}</List.Description>
        <List.Content >
          <Button primary>Topic@+</Button>

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
        <CourseEditor/>
        <TopicEditor/>
        <Button onClick={()=>console.log(editContent.get())}>Console.log</Button>
      </div>
    </div>
  )
}


export default EditPage