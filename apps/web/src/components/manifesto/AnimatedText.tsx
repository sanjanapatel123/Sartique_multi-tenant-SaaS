"use client";

import React, { Children, isValidElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const wordStyle = {
  opacity: 0.35,
  filter: "blur(2px)",
};

function splitNode(node: ReactNode): ReactNode {
  // Plain text
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, index) => {
      if (part.trim() === "") return part;

      return (
        <span
          key={index}
          className="word inline-block mr-[0.28em]"
          style={wordStyle}
        >
          {part}
        </span>
      );
    });
  }

  // Array of children
  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>{splitNode(child)}</React.Fragment>
    ));
  }

  // React Element
  if (isValidElement(node)) {
    if (node.type === "br") {
      return <br />;
    }

    const element = node as React.ReactElement<{
      children?: React.ReactNode;
    }>;

    return React.cloneElement(
      element,
      {},
      Children.map(element.props.children, splitNode),
    );
  }

  return node;
}

const AnimatedText = ({ children, className = "" }: Props) => {
  return <p className={className}>{Children.map(children, splitNode)}</p>;
};

export default AnimatedText;
