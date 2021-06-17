import React from 'react'

import { useTracker } from 'meteor/react-meteor-data'
import { Button, List } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

import { Topic, TopicCollection, editTopicId } from '/imports/api/TopicCollection'

const TopicList = ({ courseId }) => {
    const { id } = useParams()

    const topics = useTracker(() => TopicCollection.find({ courseid: id }).map((topic) =>

        <List.Item style={{ paddingBottom: '2rem' }}>
            <List.Content>
                <List.Content>
                    <Button floated='right' secondary onClick={() => editTopicId.set(topic._id)}>edit</Button>
                </List.Content>
                <List.Header as='a'>{topic.title}</List.Header>
                <List.Description as='a'>{topic.description}</List.Description>
            </List.Content>

        </List.Item>
    ))

    return (
        <div>
            {topics}
        </div>
    )
}

export default TopicList;