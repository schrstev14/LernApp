import React from 'react';
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { editTopicId, TopicCollection } from '/imports/api/TopicCollection'
import MarkdownEditorWithDisplay from '../MarkdownEditor/MarkdownEditorWithDispay';
import { Loader } from 'semantic-ui-react'

const TopicEditor = () => {
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('Topics')
    return !handle.ready()
  })

  const topic = useTracker(() => TopicCollection.findOne(editTopicId.get() ?? 'fnord'))
  const content = topic?.content ?? 'leer'
  function onSave(newValue: string): void {

  }
  if (isLoading) { return <div><Loader>Loading</Loader></div> }
  return (
    <div style={{ padding: '1rem' }} >
      <MarkdownEditorWithDisplay value={content} onSave={onSave} />

    </div>
  )
}

export default TopicEditor;