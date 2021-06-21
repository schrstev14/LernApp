import React, { useEffect, useState } from 'react';
import MarkdownDisplay from '/imports/ui/MarkdownEditor/MarkdownDisplay'
import MarkdownEditor from '/imports/ui/MarkdownEditor/MarkdownEditor'
import { Button } from 'semantic-ui-react';

const MarkdownEditorWithDisplay = ({value, onSave}: {value:string, onSave: (newValue: string) => void}) => {
  const [currentValue, setCurrentValue] = useState(value) 
  useEffect(() => setCurrentValue(value), [value])
  return (

    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <MarkdownEditor value={currentValue} onChange={setCurrentValue} editorWidth={400} editorHeight={400} />
        <MarkdownDisplay markdown={currentValue} style={{ color: 'black' }} contentClass="fnord" />
      </div>
      <div>
      <Button onClick={() => onSave(currentValue)}>Save</Button>
      </div>
    </div>
  )
};

export default MarkdownEditorWithDisplay