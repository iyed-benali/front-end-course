import React, { useState } from 'react';
import { marked, Renderer } from 'marked';

import './App.css'
const renderer = new Renderer();

const App = () => {
  const [markdown, setMarkdown] = useState(`# Heading 1
## Heading 2
[Link](https://www.example.com)
\`inline code\`
\`\`\`javascript
// Code block
function example() {
  return 'Hello, World!';
}
\`\`\`
- List item 1
- List item 2
> Blockquote
![Image](https://www.example.com/image.jpg)
**Bolded text**`);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const getMarkdownText = () => {
    return { __html: marked(markdown, { renderer }) };
  };

  return (
    <div id="app-container" class="container">
    <h1 class="heading">Markdown Previewer</h1>
    <div class="editor-container">
      <label for="editor" class="editor-label">Markdown Input:</label>
      <textarea id="editor" class="editor" value={markdown} onChange={handleChange}></textarea>
    </div>
    <div class="preview-container">
      <label for="preview" class="preview-label">HTML Preview:</label>
      <div id="preview" class="preview" dangerouslySetInnerHTML={getMarkdownText()}></div>
    </div>
  </div>
  
  );
};

export default App;
