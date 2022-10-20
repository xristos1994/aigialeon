import React from 'react';
import rangeParser from 'parse-numeric-range';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);



const TrainingPage = (props) => {
  const { title, body, prevSlug, nextSlug, currentPageIndex, numOfPages, trainingsData } = props?.pageContext;
  console.log(props?.pageContext.trainings)

  console.log(trainingsData);

  useKeyboardNavigation(prevSlug, nextSlug);

  const syntaxTheme = oneDark

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
            table: (props) => <table className="table">{props.children}</table>,
            code({ node, inline, className, ...props }) {

              const match = /language-(\w+)/.exec(className || '')
              const hasMeta = node?.data?.meta

              const applyHighlights = (applyHighlights) => {
                if (hasMeta) {
                  const RE = /{([\d,-]+)}/
                  const metadata = node.data.meta?.replace(/\s/g, '')
                  const strlineNumbers = RE?.test(metadata)
                    ? RE?.exec(metadata)[1]
                    : '0'
                  const highlightLines = rangeParser(strlineNumbers)
                  const highlight = highlightLines
                  const data = highlight.includes(applyHighlights)
                    ? 'highlight'
                    : null
                  return { data }
                } else {
                  return {}
                }
              }

              return match ? (
                <SyntaxHighlighter
                  style={syntaxTheme}
                  language={match[1]}
                  PreTag="div"
                  className="codeStyle"
                  showLineNumbers={true}
                  wrapLines={hasMeta ? true : false}
                  useInlineStyles={true}
                  lineProps={applyHighlights}
                  {...props}
                />
              ) : (
                <code className={className} {...props} />
              )
            },
            // a: (props) => {
            //   console.log(props.node.properties.href);
            //   return <div>Anchor tag</div>
            // }
          }}
        />
      </div>
    </div>
  );
};

export default TrainingPage;
