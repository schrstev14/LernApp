import React from 'react';
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { editTopicId, TopicCollection } from '/imports/api/TopicCollection'
import { Loader, Container, Popup } from 'semantic-ui-react'
import { SubmitField } from '/imports/ui/uniforms-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from '/imports/ui/uniforms-react';
import MarkdownField from '/imports/ui/Parts/MarkdownField'

const CustomSubmitField = () => (
  <div style={{ textAlign: 'center' }}>
    <Popup
      content='Saved'
      on='click'
      pinned
      trigger={<SubmitField value='Save' />}
    />
  </div>
)

SimpleSchema.extendOptions(['uniforms']);

const InputSchemaTopic = new SimpleSchema({
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

const TopicEditor = ({ courseId }) => {
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Topics')
    return !handle.ready()
  })

  const topic = useTracker(() => editTopicId.get() != '0' ? (TopicCollection.findOne(editTopicId.get() ?? 'fnord')) : ({ courseId: courseId }))

  function onSave(newValue: string): void {
    //@ts-ignore
    Meteor.callAsync('topics.save', newValue)
    console.log({ newValue })
  }
  if (isLoading) { return <div><Loader>Loading</Loader></div> }
  return (
    <div style={{ padding: '1rem' }} >
      <Container text>
        <AutoForm schema={InputSchemaTopicBridge} onSubmit={onSave} model={topic} submitField={CustomSubmitField} />
      </Container>
    </div>
  )
}

export default TopicEditor;