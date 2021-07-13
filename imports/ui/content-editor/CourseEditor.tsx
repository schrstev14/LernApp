import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Loader, Container, Popup } from 'semantic-ui-react'
import { SubmitField } from '/imports/ui/uniforms-react';
import { editCourseId, CourseCollection } from '/imports/api/CourseCollection';
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

const InputSchemaCourse = new SimpleSchema({
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
  imageURL: {
    type: String,
    label: 'ImageUrl',
    min: 5,
    max: 50
  },
})

const InputSchemaCourseBridge = new SimpleSchemaBridge(InputSchemaCourse);

const CourseEditor = () => {
  const course = useTracker(() => CourseCollection.findOne(editCourseId.get() ?? 'fnord'))
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Courses')
    return !handle.ready()
  })

  function onSave(newValue: string): void {
    //@ts-ignore
    Meteor.callAsync('courses.save', newValue)
    console.log({ newValue })
  }

  if (isLoading) { return <div><Loader>Loading</Loader></div> }

  return (
    <div style={{ padding: '1rem' }} >
      <Container text>
        <AutoForm schema={InputSchemaCourseBridge} onSubmit={onSave} model={course} submitField={CustomSubmitField} />
      </Container>
    </div>
  )
}


export default CourseEditor;