import type { MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/*
 * Inline-block (not flex) so the trailing arrow flows with the text and hugs
 * the last word when a label wraps, instead of floating detached at the edge.
 */
const baseClass =
  'inline-block max-w-full rounded-sm text-sm font-medium text-purple-300 underline decoration-purple-400/40 underline-offset-4 hover:text-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300';

interface TextLinkProps {
  /** Router path, in-page anchor or external HTTP(S) URL. */
  to: string;
  /** Open reference material separately; internal navigation stays in the current tab. */
  newTab?: boolean;
  children: ReactNode;
  /** Layout-only additions (margins, self-alignment); the link style itself stays uniform. */
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Set to -1 to take duplicated links (e.g. marquee clones) out of the tab order. */
  tabIndex?: number;
}

/**
 * The single standalone text-link style: underlined purple text with a
 * trailing tilted arrow. Every "read the case" /
 * deep-link affordance uses this so colour and iconography stay consistent.
 * Inline links inside running prose keep plain underlined text instead.
 */
export function TextLink({ to, children, className, onClick, tabIndex, newTab = false }: TextLinkProps) {
  const classes = className ? `${baseClass} ${className}` : baseClass;
  const content = (
    <>
      {children}
      <ArrowUpRight
        size={14}
        strokeWidth={1.8}
        aria-hidden="true"
        className="ml-1 inline-block align-[-0.125em]"
      />
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (to.startsWith('#') || /^https?:\/\//.test(to)) {
    return (
      <a href={to} className={classes} onClick={onClick} tabIndex={tabIndex}
        target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick} tabIndex={tabIndex}
      target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
      {content}
    </Link>
  );
}
