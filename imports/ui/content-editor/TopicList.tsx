import React from 'react'
import { Meteor } from 'meteor/meteor'

import { useTracker } from 'meteor/react-meteor-data'
import { Button, List, Loader } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

import { Topic, TopicCollection, editTopicId } from '/imports/api/TopicCollection'

const TopicList = ({ courseId }) => {
    const { id } = useParams()

    const isLoading = useTracker(() => {
        const handle = Meteor.subscribe('Topics')
        return !handle.ready()
    })

    const topics = useTracker(() => TopicCollection.find({ courseid: id }).map((topic) =>

        <List.Item style={{ paddingBottom: '2rem' }} key={topic._id}>
            <List.Content>
                <List.Content>
                    <Button floated='right' secondary onClick={() => editTopicId.set(topic._id)}>edit</Button>
                </List.Content>
                <List.Header as='a'>{topic.title}</List.Header>
                <List.Description as='a'>{topic.description}</List.Description>
            </List.Content>
        </List.Item>
    ))

    if (isLoading) { return <div><Loader>Loading</Loader></div> }
    return (
        <div>
            <Button primary onClick={() => editTopicId.set('0')}>Topic@+</Button>
            {topics}
        </div>
    )
}

export default TopicList;