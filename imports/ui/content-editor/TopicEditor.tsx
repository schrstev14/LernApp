import React from 'react';
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { editTopicId, TopicCollection } from '/imports/api/TopicCollection'
import { Loader, Container } from 'semantic-ui-react'
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from '/imports/ui/uniforms-react';
import MarkdownField from '/imports/ui/Parts/MarkdownField'

SimpleSchema.extendOptions(['uniforms']);

const InputSchemaTopic = new SimpleSchema({
  courseId: {
    type: String,
    label: 'CourseID',
    min: 5,
    max: 25
  },
  title: {
    type: String,
    min: 5,
    max: 25
  },
  description: {
    type: String,
    min: 5,
    max: 100,
    //@ts-ignore
    uniforms: {
      component: MarkdownField
    }
  },
  content: {
    type: String,
    min: 5,
    max: 300,
    //@ts-ignore
    uniforms: {
      component: MarkdownField
    }
  },
})

const InputSchemaTopicBridge = new SimpleSchemaBridge(InputSchemaTopic);

const TopicEditor = () => {
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Topics')
    return !handle.ready()
  })

  const topic = useTracker(() => TopicCollection.findOne(editTopicId.get() ?? 'fnord'))

  function onSave(newValue: string): void {
    //@ts-ignore
    Meteor.callAsync('topics.save', newValue)
    console.log({ newValue })
  }
  if (isLoading) { return <div><Loader>Loading</Loader></div> }
  return (
    <div style={{ padding: '1rem' }} >
      <Container text>
        <AutoForm schema={InputSchemaTopicBridge} onSubmit={onSave} model={topic} />
      </Container>
    </div>
  )
}

export default TopicEditor;