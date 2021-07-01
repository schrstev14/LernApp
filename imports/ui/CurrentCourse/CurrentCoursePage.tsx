import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { Loader } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { CourseCollection } from '/imports/api/CourseCollection';
import { Topic, TopicCollection } from '/imports/api/TopicCollection';
import { List } from 'semantic-ui-react'
import MarkdownDisplay from '/imports/ui/MarkdownDisplay'

const CurrentCoursePage = () => {
  const { id } = useParams()
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

  // const lastvist = useTracker(()=>CourseCollection.findOne(user?._id))
  // useEffect(()=>
  //  //@ts-ignore
  // Meteor.callAsync('LastVisited.save', _id=lastvist?? 'undefined' ,courseid = id, userid=user?._id), 
  // [id])
 
  

  const course = useTracker(() => CourseCollection.findOne(id))
  const topics = useTracker(() => TopicCollection.find({ courseId: id }).map((topic) =>

    <List.Item onClick={() => setCurrentTopic(topic)} key={topic._id}>
      <List.Content>
        <List.Header as='a' >{topic.title}</List.Header>
        <List.Description as='a'>{topic.description}</List.Description>
      </List.Content>
    </List.Item>

  ))
  if (isLoadingTopics || isLoadingCourses) { return <div><Loader>Loading</Loader></div> }

  return (


    <div style={{ flexGrow: 1, padding: '1rem', display: 'flex' }} >
      {/* Menu */}
      <div style={{ width: '10rem', marginRight: '2rem' }}>
        <List divided relaxed> {topics} </List>
      </div>
      {/* Content */}
      <div>
        <MarkdownDisplay markdown={currentTopic?.content} style={{ color: 'black' }} contentClass="fnord" />
      </div>

    </div>
  )
}

export default CurrentCoursePage;