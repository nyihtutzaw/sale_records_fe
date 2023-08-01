import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichTextEditor({ onChange, value: initValue }) {
  const handleEditorChange = (value) => {
    onChange(value);
  };

  return (
    <ReactQuill
      value={initValue}
      onChange={handleEditorChange}
      modules={{
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      }}
    />
  );
}

export default RichTextEditor;
