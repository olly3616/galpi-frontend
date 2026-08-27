import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/theme';

const c = Colors.light;

/** Brand mark: a book with a gold bookmark tucked between its pages. From galpi-design/assets/logo.svg. */
export function Logo({ size = 56 }: { size?: number }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={c.primary}
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M9 9.5A3.5 3.5 0 0 1 12.5 6H37a2 2 0 0 1 2 2v29a2 2 0 0 1-2 2H12.5A3.5 3.5 0 0 1 9 35.5Z" />
      <Path d="M9 35.5A3.5 3.5 0 0 1 12.5 32H39" />
      <Path d="M19 6v20l5.5-4L30 26V6" fill={c.accent} stroke={c.accentStrong} />
    </Svg>
  );
}
