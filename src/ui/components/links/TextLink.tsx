import type { MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/*
 * Inline-block (not flex) so the trailing arrow flows with the text and hugs
 * the last word when a label wraps, instead of floating detached at the edge.
 */
const baseClass =
  'group/link inline-block max-w-full text-sm text-purple-300 underline-offset-4 hover:underline';

interface TextLinkProps {
  /** Router path, or an in-page anchor when it starts with "#". */
  to: string;
  children: ReactNode;
  /** Layout-only additions (margins, self-alignment); the link style itself stays uniform. */
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Set to -1 to take duplicated links (e.g. marquee clones) out of the tab order. */
  tabIndex?: number;
}

/**
 * The single standalone text-link style: small purple text, underline on
 * hover, and a trailing arrow that nudges right. Every "read the case" /
 * deep-link affordance uses this so colour and iconography stay consistent.
 * Inline links inside running prose keep plain underlined text instead.
 */
export function TextLink({ to, children, className, onClick, tabIndex }: TextLinkProps) {
  const classes = className ? `${baseClass} ${className}` : baseClass;
  const content = (
    <>
      {children}
      <ArrowRight
        size={14}
        strokeWidth={1.8}
        aria-hidden="true"
        className="ml-1 inline-block align-[-0.125em] transition-transform duration-150 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
      />
    </>
  );

  if (to.startsWith('#')) {
    return (
      <a href={to} className={classes} onClick={onClick} tabIndex={tabIndex}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick} tabIndex={tabIndex}>
      {content}
    </Link>
  );
}
