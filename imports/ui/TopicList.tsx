import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Button, List } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

import { CourseCollection } from '../api/CourseCollection'
import { Topic, TopicCollection } from '../api/TopicCollection'

const TopicList = ({ courseId }) => {
    const { id } = useParams()
    const SearchItem = useTracker(() => TopicCollection.find({ courseid: id }).map((topic) =>

        <List.Item style={{paddingTop: '1rem', paddingBottom: '2rem'}}>
            <List.Content>
                <List.Header as='a'>{topic.title}</List.Header>
                <List.Description as='a'>{topic.description}</List.Description>

            <Button floated='right' secondary>Topic@Edit</Button>
            </List.Content>
            
        </List.Item>
    ))

    return (
        <div>
            {SearchItem}
        </div>
    )
}

export default TopicList;