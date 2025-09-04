import React, { ReactNode } from 'react';
import type { SimpleMarkdownRendererProps } from '../types';

/**
 * A simple and safe Markdown to React component renderer.
 * Supports:
 * - #, ##, ### Headings
 * - Lists starting with "- "
 * - **bold** text
 * It processes content line by line and groups consecutive list items into a <ul>.
 */
const SimpleMarkdownRenderer: React.FC<SimpleMarkdownRendererProps> = ({ content }) => {
  // A helper function to process **bold** text within a line.
  // This is safer than using dangerouslySetInnerHTML.
  const renderTextWithBold = (text: string, keyPrefix: string) => {
    // Split by the bold delimiter, keeping the captured group.
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // It's a bold part, render as <strong>
        return <strong key={`${keyPrefix}-${index}`}>{part.slice(2, -2)}</strong>;
      }
      // It's a regular text part
      return part;
    });
  };

  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let listItems: ReactNode[] = [];

  const flushListItems = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-5 space-y-1 my-4">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const key = `line-${index}`;

    if (line.startsWith('### ')) {
      flushListItems();
      elements.push(<h3 key={key} className="text-xl font-semibold mt-4 mb-2 text-gray-700">{renderTextWithBold(line.substring(4), key)}</h3>);
      return;
    }
    if (line.startsWith('## ')) {
      flushListItems();
      elements.push(<h2 key={key} className="text-2xl font-bold mt-6 mb-3 text-gray-800 border-b pb-2">{renderTextWithBold(line.substring(3), key)}</h2>);
      return;
    }
    if (line.startsWith('# ')) {
      flushListItems();
      elements.push(<h1 key={key} className="text-3xl font-bold mt-2 mb-4 text-green-600">{renderTextWithBold(line.substring(2), key)}</h1>);
      return;
    }
    if (line.startsWith('- ')) {
      listItems.push(<li key={key}>{renderTextWithBold(line.substring(2), key)}</li>);
      return;
    }

    // If it's not a list item, flush any existing list.
    flushListItems();

    if (line.trim() === '') {
      elements.push(<div key={key} className="h-4" />);
    } else {
      elements.push(<p key={key} className="mb-2">{renderTextWithBold(line, key)}</p>);
    }
  });

  // After the loop, flush any remaining list items.
  flushListItems();
  
  // The `prose` class from Tailwind Typography can add unwanted styles, 
  // like black backgrounds for code blocks that the AI might generate.
  // We remove it and use our own specific styling for a consistent look.
  // `text-lg` and `leading-relaxed` are used to replicate the look of `prose-lg`.
  return (
    <article className="max-w-none text-lg leading-relaxed text-gray-800">
      {elements}
    </article>
  );
};

export default SimpleMarkdownRenderer;