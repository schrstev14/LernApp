import React, {useState} from 'react';
import MarkdownDisplay from '/imports/ui/MarkdownEditor/MarkdownDisplay'
import MarkdownEditor from '/imports/ui/MarkdownEditor/MarkdownEditor'

const MarkdownEditorPage = () => {
  const [value, setValue]= useState('')
  return(
  <div style={{display: 'flex', flexWrap:'wrap'}}>
    <MarkdownEditor value={value} onChange={setValue} editorWidth={400} editorHeight={400}/>
    <MarkdownDisplay markdown={value} style={{color: 'black'}} contentClass="fnord"/>
  </div>
  )
};

export default MarkdownEditorPage