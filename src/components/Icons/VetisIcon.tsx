import { h } from 'preact';
import { IIcon } from './_Interface';

const VetisIcon = (props: IIcon) => {
  const { color, width, height, style } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || 20}
      height={height || 20}
      style={style || {}}
      viewBox="0 0 38.3 41.3"
    >
      <path
        fill={color}
        d="M25.3,25.4c-0.2,1.1,0,2.2,0.6,3.2c0.2,0.4,0.5,0.8,0.7,1.2c0.2,0.3,0.3,0.5,0.4,0.7l0,0.1l0,0.1l-2.6,4.5
	l-2.6-4.7l1.3-2.2c0.2-0.2,0.2-0.5,0-0.8c-0.1-0.2-0.3-0.4-0.7-0.4h-1.8l2.6-4.7h2.2c0.6,0,1.1,0.1,1.7,0.5l-0.1,0.2
	c0,0-0.2,0.1-0.3,0.1l0,0C26,23.9,25.5,24.6,25.3,25.4z M29.6,25.1c0.5-0.3,1-0.8,1.3-1.4l1.1-1.9l0-0.1l-2.6-4.7l-0.9,1.5
	c-0.1,0.2-0.3,0.4-0.7,0.4c-0.3,0-0.5-0.1-0.7-0.4l-1.3-2.2h-5.3l2.6,4.6l0,0.1h2.2c1.6,0,2.7,0.6,3.5,1.7c0.3,0.5,0.4,0.9,0.5,1.4
	c0,0.1,0,0.2,0.1,0.3c0,0.1,0,0.1,0,0.2v0.6L29.6,25.1z M33,21.1h5.3l-2.6-4.6l0-0.1h-5.3L33,21.1L33,21.1z M25.5,35.7h5.3l2.6-4.7
	h-5.3L25.5,35.7z M19.5,17.1l-2.6,4.7l2.6,4.7l2.6-4.6l0-0.1L19.5,17.1z M32,24.3L32,24.3c-0.5,1.1-1.4,1.8-2.4,2.2
	c-0.2,0.1-0.6,0.1-0.8,0.1c-0.6,0-1.1-0.1-1.5-0.3c0,0-0.1,0-0.1-0.1c-0.1-0.1-0.3-0.1-0.4-0.2L26.5,26c0,0.6,0.2,1.3,0.5,1.9
	c0.2,0.4,0.5,0.8,0.7,1.2c0.2,0.2,0.3,0.5,0.4,0.6l0,0.1h5.3l-0.9-1.5c-0.1-0.2-0.1-0.5,0-0.7c0.1-0.2,0.3-0.4,0.7-0.4h2.4l2.6-4.7
	h-5.2L32,24.3z M28.4,36.9h2v1.9c0,1.3-1.1,2.4-2.4,2.4H2.4c-1.3,0-2.4-1.1-2.4-2.4V2.4C0,1.1,1.1,0,2.4,0h17.2l0,0L30.4,11v4.2h-2
	v-3.4l-0.1-0.1h-7c-1.3,0-2.4-1.1-2.4-2.4v-7L18.8,2H2.4C2.2,2,2,2.2,2,2.4v36.4c0,0.2,0.2,0.4,0.4,0.4H28c0.2,0,0.4-0.2,0.4-0.4
	V36.9z M21.2,9.6h5l-5.4-5.4v5C20.8,9.4,21,9.6,21.2,9.6z"
      />
    </svg>
  );
};

export default VetisIcon;