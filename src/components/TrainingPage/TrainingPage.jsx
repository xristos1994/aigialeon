import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| Attribute   | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| onchange    | Script to be run when the value of the element is changed   |
| onclick     | Script to be run when the element is being clicked          |
| oninput     | Script to be run when the element gets user input           |
| onmouseover | Script to be run when a mouse pointer moves over an element |
`

const TrainingPage = (props) => {
  const { title, body, prevSlug, nextSlug, currentPageIndex, numOfPages, trainingsData } = props?.pageContext;

  console.log(body);

  useKeyboardNavigation(prevSlug, nextSlug);

  return (
    <div>
      <h1>{title} - {currentPageIndex} of {numOfPages}</h1>
      <div className="Training">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          children={body}
          components={{
            h1: ({ children }) => <h1>{children}</h1>,
            h3: ({ children }) => <h3>{children}</h3>,
            h4: ({ children }) => <h4>{children}</h4>,
            ul: ({ children }) => <ul>{children}</ul>,
            p: ({ children }) => <p style={{ fontSize: "2rem" }}>{children}</p>,
            iframe: (props) => (
              <iframe
                style={{ ...props.style, width: "90vw", height: "80vh" }}
                title="iframe"
                {...props}
              />
            ),
            row: (props) => <div className="row">{props.children}</div>,
            blockquote: (props) => (
              <blockquote className={props.className}>{props.children}</blockquote>
            ),
            // table: (props) => <table className="table">{props.children}</table>
          }}
        />
      </div>
    </div>
  );
};

export default TrainingPage;
