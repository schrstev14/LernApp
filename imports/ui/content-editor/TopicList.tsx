import React from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { Button, List, Loader, ButtonGroup, Icon, Modal } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import TopicEditor from './TopicEditor'
import { TopicCollection, editTopicId } from '/imports/api/TopicCollection'

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

        <List.Item style={{ padding: '1em',paddingBottom: '1rem', paddingTop: '1rem' }} key={topic._id}>
            <List.Content>
                <List.Content>
                    <ButtonGroup floated='right'>
                        <Modal
                            trigger={<Button circular negative icon> <Icon name='delete' circular size='small' /></Button>}
                            header={'Warning'}
                            content={'You really want to delete this ?'}
                            actions={[{key:'not', content:'abort', negative: true}, { key: 'done', content: 'Yes', positive: true, onClick: () => remove(topic._id) }]}
                        />
                        <Modal
                            trigger={<Button circular primary onClick={() => editTopicId.set(topic._id)} icon> <Icon name='edit' circular size='small' /></Button>}
                            header={editTopicId.get() != '0' ? ('Edit Topic') : ('New Topic')}
                            content={<TopicEditor courseId={courseId} />}
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
                trigger={<Button circular positive onClick={() => editTopicId.set('0')}>Topic <Icon name='add' circular size='small' /></Button>}
                header={editTopicId.get() != '0' ? ('Edit Topic') : ('New Topic')}
                content={<TopicEditor courseId={courseId} />}
            />

            {topics}
        </div>
    )
}

export default TopicList;