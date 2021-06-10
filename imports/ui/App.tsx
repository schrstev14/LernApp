import React, {useState} from 'react';
import MarkdownDisplay from '/imports/ui/MarkdownEditor/MarkdownDisplay'
import MarkdownEditor from '/imports/ui/MarkdownEditor/MarkdownEditor'

export const App = () => {
  const [value, setValue]= useState('')
  return(
  <div>
    <h1>Welcome to Meteor!</h1>
    <MarkdownEditor value={value} onChange={setValue} editorWidth={400} editorHeight={400}/>
    <MarkdownDisplay markdown={value} style={{color: 'black'}} contentClass="fnord"/>
  </div>
  )
};
