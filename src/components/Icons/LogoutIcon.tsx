import { h } from 'preact';

interface ILogoutIconProps {
  color?: string;
  width?: number;
  height?: number;
  style?: any;
  xOffset?: any;
  className?: string;
}

const Logout = (props: ILogoutIconProps) => {
  const { color, width, height, style, xOffset, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || 22}
      height={height || 22}
      style={style || {}}
      viewBox={`${xOffset || '0'} 0 22 22`}
      className={className || ''}
    >
      <path d="M15 7.182h-1V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.865h1V18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1.182zM19.293 11l-2.5-2.5.707-.707 3.707 3.707-3.707 3.707-.707-.707 2.5-2.5H12v-1h7.293z" />
      <use fill={color} fillRule="nonzero" xlinkHref="#a" />
    </svg>
  );
};

export default Logout;
