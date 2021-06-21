import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Loader, Container } from 'semantic-ui-react'
import { editCourseId, CourseCollection } from '/imports/api/CourseCollection';
import MarkdownEditorWithDisplay from '../MarkdownEditor/MarkdownEditorWithDispay';
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from '/imports/ui/uniforms-react';
import MarkdownField from '/imports/ui/Parts/MarkdownField'

SimpleSchema.extendOptions(['uniforms']);

const InputSchemaCourse = new SimpleSchema({
  course_title: {
    type: String,
    label: 'Title',
    min: 5,
    max: 50
  },
  course_description: {
    type: String,
    min: 5,
    max: 100,
    //@ts-ignore
    uniforms: {
      component: MarkdownField,
      label: 'Description',
    }
  },
  course_imageURL: {
    type: String,
    label: 'ImageUrl',
    min: 5,
    max: 50
  },
})

const InputSchemaCourseBridge = new SimpleSchemaBridge(InputSchemaCourse);

const CourseEditor = () => {
  const course = useTracker(() => CourseCollection.findOne(editCourseId.get() ?? 'fnord'))
  const content = JSON.stringify(course, null, 2)//(course?.title ?? '--') + '\n' + (course?.description ?? '--') + '\n' + (course?.imageURL ?? '--') + '\n' //course?.title.concat(course?.description.concat(course?.imageURL ?? 'leer') ?? 'leer' ) ?? 'leer' 
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Courses')
    return !handle.ready()
  })
  function onSave(newValue: string): void {
    // Meteor.callAsync('courses.save', course)
    console.log({ newValue })
  }
  if (isLoading) { return <div><Loader>Loading</Loader></div> }
  return (
    <div style={{ padding: '1rem' }} >
      <MarkdownEditorWithDisplay value={content} onSave={onSave} />
      <Container text>
        <AutoForm schema={InputSchemaCourseBridge} onSubmit={console.log} value={content}/>
      </Container>
    </div>
  )
}


export default CourseEditor;