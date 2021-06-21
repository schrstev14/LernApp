import React from 'react';
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { editTopicId, TopicCollection } from '/imports/api/TopicCollection'
import MarkdownEditorWithDisplay from '../MarkdownEditor/MarkdownEditorWithDispay';
import { Loader, Container } from 'semantic-ui-react'
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from '/imports/ui/uniforms-react';

const InputSchemaTopic = new SimpleSchema({
  topic_courseId: {
    type: String,
    label: 'CourseID',
    min: 5,
    max: 25
  },
  topic_title: {
    type: String,
    label: 'Title',
    min: 5,
    max: 25
  },
  topic_description: {
    type: String,
    label: 'Description',
    min: 5,
    max: 100
  },
  topic_content: {
    type: String,
    label: 'Content',
    min: 5,
    max: 300
  },
})

const InputSchemaTopicBridge = new SimpleSchemaBridge(InputSchemaTopic);

const TopicEditor = () => {
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Topics')
    return !handle.ready()
  })

  const topic = useTracker(() => TopicCollection.findOne(editTopicId.get() ?? 'fnord'))
  const content = JSON.stringify(topic, null, 2)//(topic?.courseId ?? '--') + '\n' + (topic?.title ?? '--') + '\n' + (topic?.description ?? '--') + '\n' + (topic?.content ?? '--') + '\n'//topic?.content ?? 'leer'
  function onSave(newValue: string): void {

  }
  if (isLoading) { return <div><Loader>Loading</Loader></div> }
  return (
    <div style={{ padding: '1rem' }} >
      <MarkdownEditorWithDisplay value={content} onSave={onSave} />
      <Container text>
      <AutoForm schema={InputSchemaTopicBridge} onSubmit={console.log}/>
      </Container>
    </div>
  )
}

export default TopicEditor;