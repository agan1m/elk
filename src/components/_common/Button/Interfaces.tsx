'use strict';

export interface IProps {
  color?: string;
  primary?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  margin?: string;
  onClick?: (...args: any[]) => void;
  disabled?: boolean;
  children: string;
  width?: string;
  className?: string;
}