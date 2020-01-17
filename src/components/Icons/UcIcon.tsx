import { h } from 'preact';
import { IIcon } from './_Interface';

const UcIcon = (props: IIcon) => {
  const { color, width, height, style } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || 20}
      height={height || 20}
      style={style || {}}
      viewBox="0 0 38.2 40"
    >
      <path
        fill={color}
        d="M38.2,10.2c0-0.8-0.4-1.5-0.9-2L29,0.7c-0.6-0.5-1.3-0.8-2.1-0.7c-0.8,0.1-1.5,0.4-2,0.9l-6.7,7.4
	c-0.7-0.6-1.6-0.9-2.5-0.9c-1,0.1-1.8,0.5-2.5,1.2L3,20.1c-4.3,4.8-3.9,12.2,0.9,16.5L4.3,37c2.2,1.9,4.9,3,7.8,3c0.3,0,0.5,0,0.8,0
	c3.1-0.2,5.9-1.6,8-3.9L31,24.7c0.6-0.7,1-1.6,0.9-2.6c0-0.9-0.5-1.8-1.1-2.4l6.7-7.4C38,11.7,38.3,10.9,38.2,10.2z M4.6,21.5
	l10.2-11.4c0.3-0.3,0.6-0.5,1-0.5c0,0,0,0,0.1,0c0.3,0,0.7,0.1,0.9,0.4l10,8.9l2.5,2.3c0.3,0.3,0.5,0.6,0.5,1c0,0.4-0.1,0.8-0.4,1.1
	L19.3,34.6c-1.7,1.9-4,3-6.6,3.2c-2.5,0.2-5-0.7-6.9-2.4L5.3,35C1.4,31.5,1.1,25.4,4.6,21.5z M19.8,9.8l6.7-7.4
	c0.1-0.2,0.3-0.2,0.5-0.2c0.2,0,0.4,0,0.5,0.2l8.3,7.4c0.2,0.1,0.2,0.3,0.2,0.5c0,0.2,0,0.4-0.2,0.5l-6.7,7.4L19.8,9.8z M26.2,6.7
	l-2.3,2.6l2.1,1.9l2.3-2.6L26.2,6.7z M29.5,9.6l-2.3,2.6l2.1,1.9l2.3-2.6L29.5,9.6z M8.9,31.6c0.8,0.7,1.7,1.1,2.7,1.1
	c0.1,0,0.2,0,0.3,0c1.1-0.1,2.1-0.6,2.8-1.4l6.2-6.9c1.5-1.7,1.4-4.3-0.3-5.8c-0.8-0.7-1.9-1.1-3-1.1c-1.1,0-2.1,0.5-2.8,1.4
	l-6.2,6.9c-0.7,0.8-1.1,1.9-1.1,3C7.6,29.8,8.1,30.8,8.9,31.6z M17.7,19.6c0.5,0,1.1,0.2,1.5,0.5c0.8,0.8,0.9,2.1,0.2,2.9l-6.2,6.9
	c-0.8,0.8-2,0.9-2.8,0.2l0,0c-0.4-0.4-0.6-0.9-0.7-1.4c0-0.5,0.2-1.1,0.5-1.5l6.2-6.9C16.7,19.8,17.2,19.6,17.7,19.6z"
      />
    </svg>
  );
};

export default UcIcon;
