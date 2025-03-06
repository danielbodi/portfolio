import React from 'react';

interface TextWithBreaksProps {
  text: string;
}

export function TextWithBreaks({ text }: TextWithBreaksProps) {
  return (
    <>
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
} 