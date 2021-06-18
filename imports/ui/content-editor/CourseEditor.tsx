import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Loader } from 'semantic-ui-react'
import { editCourseId, CourseCollection } from '/imports/api/CourseCollection';
import MarkdownEditorWithDisplay from '../MarkdownEditor/MarkdownEditorWithDispay';

const CourseEditor = () => {
  const course = useTracker(() => CourseCollection.findOne(editCourseId.get() ?? 'fnord'))
  const content = course?.title ?? 'leer'
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Courses')
    return !handle.ready()
  })
  function onSave(newValue: string): void {
      
  }
  if (isLoading) { return <div><Loader>Loading</Loader></div> }
  return (
    <div style={{ padding: '1rem' }} >
      <MarkdownEditorWithDisplay value={content} onSave={onSave} />
    </div>
  )
}


export default CourseEditor;