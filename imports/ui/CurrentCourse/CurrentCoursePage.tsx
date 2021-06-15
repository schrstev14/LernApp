import React, {useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Header, Menu, Segment, Sidebar, Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { CourseCollection } from '/imports/api/CourseCollection';
import { Topic, TopicCollection } from '/imports/api/TopicCollection';
import { List } from 'semantic-ui-react'

const CurrentCoursePage = () => {

  const { id } = useParams()
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null)
  const course = useTracker(() => CourseCollection.findOne(id))
  const topics = useTracker(() => TopicCollection.find({ courseId: id }).map((topic) =>

    <List.Item >
      <List.Content>
        <List.Header as='a' onClick={()=>setCurrentTopic(topic)}>{topic.title}</List.Header>
        <List.Description as='a'>{topic.description}</List.Description>
      </List.Content>
    </List.Item>

  ))

  return (


    <div style={{ flexGrow: 1, padding: '1rem', display: 'flex' }} >
      {/* Menu */}
      <div style={{ width: '10rem', marginRight: '2rem' }}>
        <List divided relaxed> {topics} </List>
      </div>
      {/* Content */}
      <div>
        {currentTopic?.content}
      </div>

    </div>
  )
}

export default CurrentCoursePage;