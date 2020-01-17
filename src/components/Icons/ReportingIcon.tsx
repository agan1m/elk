import { h } from 'preact';
import { IIcon } from './_Interface';

const ReportingIcon = (props: IIcon) => {
  const { color, width, height, style } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || 20}
      height={height || 20}
      style={style || {}}
      viewBox="0 0 40 40"
    >
      <path
        d="M22,0H0v22h2V2h18v7.4c0,1.8,1.8,3.6,3.6,3.6H30v25H14v2h18V11.1L22,0z M23.6,11.1c-0.8,0-1.6-0.7-1.6-1.6V3
	l7,8.1H23.6z M16.6,21.8L1.1,29.3c-0.4,0.2-0.4,0.8,0.1,0.9l5,1.6l-5.4,5.7c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l5.4-5.7
	l2.5,4.8c0.2,0.4,0.7,0.3,0.9,0l6.2-15.4C17.5,22,17.1,21.6,16.6,21.8z M10.5,34.1l-1.5-2.8c-0.3-0.5-0.7-0.8-1.2-1l-2.4-0.8
	l8.7-4.2L10.5,34.1z"
      />
      <use fill={color || '#6a7f98'} fillRule="nonzero" xlinkHref="#a" />
    </svg>
  );
};

export default ReportingIcon;
