import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { Button, Modal, List, Item } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { CourseCollection } from '../api/CourseCollection'
import { Topic, TopicCollection } from '../api/TopicCollection'
import MarkdownEditorPage from '/imports/ui/MarkdownEditor/MarkdownEditorPage'

//verschachtelte Listen + buttons (+ | edit) -> semantic ui model, 

const EditPage = () => {
    const { id } = useParams()
    const topics = useTracker(() => TopicCollection.find({}).map((topic) =>
    <List.Item >
      <List.Content>
        <List.Header as='a'>{topic.title}</List.Header>
        <List.Description as='a'>{topic.description}</List.Description>
      </List.Content>
    </List.Item>
  ))

  const courses = useTracker(() => CourseCollection.find({}).map((course) =>
    <List.Item >
      <List.Content>
        <List.Header as='a'>{course.title}</List.Header>
        <List.Description as='a'>{course.description}</List.Description>
      </List.Content>
    </List.Item>
  ))


    return(
    <div style={{ flexGrow: 1, padding: '1rem', display: 'flex' }} >
        {/* Menu */}
        <div style={{ width: '10rem', marginRight: '2rem' }}>
            <Button primary>+</Button>
            <Button secondary>Edit</Button>
           {courses}
        </div>
        {/* Content */}
        <div style={{ width: '10rem', marginRight: '2rem' }}>
            <Button primary>+</Button>
            <Button secondary>Edit</Button>
           {topics}
        </div>
        <div>
            <MarkdownEditorPage/>
        </div>
    </div>
    )
}

export default EditPage