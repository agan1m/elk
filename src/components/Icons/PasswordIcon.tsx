import { h } from 'preact';
import { IIcon } from './_Interface';

const PasswordIcon = (props: IIcon) => {
  const { color, width, height, style } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || 20}
      height={height || 20}
      style={style || {}}
      viewBox="0 0 486.025 486.025"
    >
      <g>
        <path
          fill={color}
          d="M420.725,85.413c-42.1-42.1-98.1-65.3-157.6-65.3c-60.6,0-117.3,23.9-159.6,67.3c-4.6,4.7-4.5,12.3,0.2,17
			c4.7,4.6,12.3,4.5,17-0.2c37.8-38.7,88.3-60,142.4-60c109.7-0.1,198.9,89.1,198.9,198.8s-89.2,198.9-198.9,198.9
			s-198.9-89.2-198.9-198.9v-2.5l19.8,19.8c2.3,2.3,5.4,3.5,8.5,3.5s6.1-1.2,8.5-3.5c4.7-4.7,4.7-12.3,0-17l-40.2-40.3
			c-4.7-4.7-12.3-4.7-17,0l-40.3,40.3c-4.7,4.7-4.7,12.3,0,17c2.3,2.3,5.4,3.5,8.5,3.5s6.1-1.2,8.5-3.5l19.8-19.8v2.5
			c0,59.5,23.2,115.5,65.3,157.6s98.1,65.3,157.6,65.3s115.5-23.2,157.6-65.3s65.2-98.1,65.2-157.6S462.825,127.513,420.725,85.413z
			"
        />
        <path
          fill={color}
          d="M263.125,113.413c-39,0-70.7,31.7-70.7,70.7v34.1h-22c-6.6,0-12,5.4-12,12v119.7c0,6.6,5.4,12,12,12h185.5
			c6.6,0,12-5.4,12-12v-119.6c0-6.6-5.4-12-12-12h-22v-34.1C333.925,145.213,302.125,113.413,263.125,113.413z M216.425,184.213
			c0-25.8,21-46.7,46.7-46.7s46.7,21,46.7,46.7v34.1h-93.4L216.425,184.213L216.425,184.213z M343.925,337.913h-161.5v-95.7h161.5
			V337.913z"
        />
      </g>
    </svg>
  );
};

export default PasswordIcon;
