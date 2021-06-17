import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { editTopicId, TopicCollection } from '/imports/api/TopicCollection'
import MarkdownEditorWithDisplay from '../MarkdownEditor/MarkdownEditorWithDispay';

const TopicEditor = () => {
  const topic = useTracker(() => TopicCollection.findOne(editTopicId.get() ?? 'fnord'))
  return (
    <div style={{ padding: '1rem' }} >
      <pre>{JSON.stringify(topic, null, 2)}</pre>
      <MarkdownEditorWithDisplay value={topic?.content ?? 'leer'} />

    </div>
  )
}

export default TopicEditor;