import React from 'react';
import classnames from 'classnames';
import { HTMLFieldProps, connectField, filterDOMProps } from 'uniforms';
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/ext-searchbox'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-chrome'
import { useMeasure } from "react-use";

export type MarkdownFieldProps = HTMLFieldProps<string, HTMLDivElement>;

function UnMk({ onChange, value, label, disabled, error, required, errorMessage, className, showInlineError,id, ...props }: MarkdownFieldProps) {

  const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();
  console.log({ width, height })
  return (
    <div className={classnames(className, { disabled, error, required }, 'field')} {...filterDOMProps(props)} ref={ref}>

      {label && <label htmlFor={id}>{label}</label>}

      <AceEditor mode="markdown" theme="chrome" width={width} height={200} value={value} onChange={onChange} setOptions={{
        wrap: true,
        showInvisibles: true
      }} />

      {!!(error && showInlineError) && (
        <div className="ui red basic pointing label">{errorMessage}</div>
      )}
    </div>
  );
}
const MarkdownField = connectField<MarkdownFieldProps>(UnMk);

export default MarkdownField