import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgEmailIcon = ({color}: {color: string}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={30}
    viewBox="0 0 48 48"
    fill={color}>
    <Path d="M7.6 13.6C6.4 14.8 6 17.3 6 24.4 6 37.1 5.9 37 22.6 37 40 37 40 37 40 24.5c0-12.8.4-12.5-17-12.5-11.3 0-14.2.3-15.4 1.6zM34 15.4c0 .2-2.5 2.2-5.5 4.5L23 24.1l-5.5-4.2c-3-2.3-5.5-4.3-5.5-4.5 0-.2 5-.4 11-.4 6.1 0 11 .2 11 .4zm-16.7 7.5 5.7 4.3 5.7-4.3c8.9-6.9 8.3-7.1 8.3 2.6V34H9v-8.5c0-9.7-.6-9.5 8.3-2.6z" />
  </Svg>
);
export default SvgEmailIcon;
