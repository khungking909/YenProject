import { Icon } from 'src/common/components/Atom/Icon/Icon';
import { IconProps } from 'src/common/components/Atom/Icon/type';
import { Setting } from 'src/constants/setting';

export function ZaloIcon(props: Readonly<Readonly<IconProps>>) {
  return (
    <Icon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%">
        <circle cx="512" cy="512" r="512" fill="#0084FF" />
        <text
          x="50%"
          y="50%"
          fill="#FFF"
          fontSize="250"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {Setting.Zalo}
        </text>
      </svg>
    </Icon>
  );
}
