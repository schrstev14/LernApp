import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Loader } from 'semantic-ui-react'
import { editCourseId, CourseCollection } from '/imports/api/CourseCollection';
import MarkdownEditorWithDisplay from '../MarkdownEditor/MarkdownEditorWithDispay';
import SimpleSchema from 'simpl-schema';
import SimpleSchemaBridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm } from 'uniforms';

SimpleSchema.extendOptions(['uniforms']);

const InputSchemaCourse = new SimpleSchema({
title: String,
description: String,
imageURL: String
})

const InputSchemaCourseBridge = new SimpleSchemaBridge(InputSchemaCourse);

const CourseEditor = () => {
  const course = useTracker(() => CourseCollection.findOne(editCourseId.get() ?? 'fnord'))
  const content = JSON.stringify(course, null, 2) //course?.title ?? 'leer'
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Courses')
    return !handle.ready()
  })
  function onSave(newValue: string): void {
      // Meteor.callAsync('courses.save', course)
      console.log({newValue})
  }
  if (isLoading) { return <div><Loader>Loading</Loader></div> }
  return (
    <div style={{ padding: '1rem' }} >
      <MarkdownEditorWithDisplay value={content} onSave={onSave} />
    </div>
  )
}


export default CourseEditor;