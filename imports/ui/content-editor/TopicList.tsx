import React from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { Button, List, Loader, ButtonGroup, Icon, Modal } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import TopicEditor from './TopicEditor'
import TopicAdd from '/imports/ui/content-editor/TopicAdd'
import { Topic, TopicCollection, editTopicId } from '/imports/api/TopicCollection'

const TopicList = ({ courseId }) => {
    const { id } = useParams()

    const isLoading = useTracker(() => {
        const handle = Meteor.subscribe('Topics')
        return !handle.ready()
    })
    function remove(id) {
        //@ts-ignore
        Meteor.callAsync('topicremove', id)
    }
    const topics = useTracker(() => TopicCollection.find({ courseId }).map((topic) =>

        <List.Item style={{ paddingBottom: '2rem' }} key={topic._id}>
            <List.Content>
                <List.Content>
                    <ButtonGroup floated='right'>
                        <Button negative onClick={() => remove(topic._id)} icon> <Icon name='delete' circular size='small' /></Button>
                        <Modal
                            trigger={<Button primary onClick={() => editTopicId.set(topic._id)}><Icon name='edit' circular size='small' /></Button>}
                            header={editTopicId.get() != '0' ? ('Edit Topic') : ('New Topic')}
                            content={<TopicEditor courseId={courseId}/>}
                        />
                    </ButtonGroup>
                </List.Content>
                <List.Header as='a'>{topic.title}</List.Header>
                <List.Description as='a'>{topic.description}</List.Description>
            </List.Content>
        </List.Item>
    ))

    if (isLoading) { return <div><Loader>Loading</Loader></div> }
    return (
        <div>

            <Modal
                trigger={<Button positive onClick={() => editTopicId.set('0')}>Topic <Icon name='add' circular size='small' /></Button>}
                header={editTopicId.get() != '0' ? ('Edit Topic') : ('New Topic')}
                content={<TopicEditor courseId={courseId}/>}
            />

            {topics}
        </div>
    )
}

export default TopicList;