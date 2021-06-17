import React, { useState } from 'react';
import MarkdownDisplay from '/imports/ui/MarkdownEditor/MarkdownDisplay'
import MarkdownEditor from '/imports/ui/MarkdownEditor/MarkdownEditor'

const MarkdownEditorWithDisplay = ({value}: {value:string}) => {
  const [currentValue, setCurrentValue] = useState(value)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <MarkdownEditor value={currentValue} onChange={setCurrentValue} editorWidth={400} editorHeight={400} />
      <MarkdownDisplay markdown={currentValue} style={{ color: 'black' }} contentClass="fnord" />
    </div>
  )
};

export default MarkdownEditorWithDisplay