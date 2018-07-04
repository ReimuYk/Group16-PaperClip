import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
        textContent: '', 
        textHtml:"",
        theme: 'snow'
     }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(content, delta, source, editor) {
      this.setState({
           textContent: editor.getText(),
           textHtml:content
        });
      console.log(editor.getText());
  }
    
  render () {
    return (
        <ReactQuill 
          theme={this.state.theme}
          onChange={this.handleChange}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder="请输入内容"
         />
     )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default Editor;
