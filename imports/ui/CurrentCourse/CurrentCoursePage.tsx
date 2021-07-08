import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { Loader } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'
import { CourseCollection } from '/imports/api/CourseCollection';
import { Topic, TopicCollection } from '/imports/api/TopicCollection';
import { List, Button, Icon } from 'semantic-ui-react'
import MarkdownDisplay from '/imports/ui/MarkdownDisplay'

const CurrentCoursePage = () => {
  const { id } = useParams()
  const history = useHistory();
  const user = useTracker(() => Meteor.user());
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null)

  const isLoadingTopics = useTracker(() => {
    const handle = Meteor.subscribe('Topics')
    return !handle.ready()
  })
  const isLoadingCourses = useTracker(() => {
    const handle = Meteor.subscribe('Courses')
    return !handle.ready()
  })

  useEffect(() =>
    user ? (
      Meteor.call('LastVisited.save', { courseId: id, userId: user?._id })) : (console.log())
    , [id])

  const course = useTracker(() => CourseCollection.findOne(id))
  const topics = useTracker(() => TopicCollection.find({ courseId: course?._id }).map((topic) =>

    <List.Item onClick={() => setCurrentTopic(topic)} key={topic._id} style={{paddingTop: '1rem', paddingBottom: '1rem'}}>
      <List.Content>
        <List.Header as='a' >{topic.title}</List.Header>
        <List.Description as='a'>{topic.description}</List.Description>
      </List.Content>
    </List.Item>
  ))
  if (isLoadingTopics || isLoadingCourses) { return <div><Loader>Loading</Loader></div> }

  return (
    <div style={{ flexGrow: 1, padding: '1rem', display: 'flex' }} >
      <div style={{ width: '17rem', marginRight: '2rem' }}>
        <Button circular negative onClick={() => history.push('/courses')} icon><Icon name='arrow left' /> Back to All Courses </Button>
        <List divided relaxed> {topics} </List>
      </div>
      <div>
        <MarkdownDisplay markdown={currentTopic?.content} style={{ color: 'black' }} contentClass="fnord" />
      </div>
    </div>
  )
}

export default CurrentCoursePage;