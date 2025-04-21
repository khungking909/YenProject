export interface TypographyProps {
  readonly variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'text';
  readonly fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  readonly fontWeight?: 'bold' | 'premium' | 'regular' | 'semibold';
  readonly fontFamily?: 'inter' | 'space-grote';
  readonly fontStyle?: 'normal' | 'italic' | 'oblique';
  readonly textDecoration?: 'overline' | 'line-through' | 'underline';
  readonly color?: string;
  readonly lineHeight?: string | number;
  readonly letterSpacing?: string | number;
  readonly textTransform?: 'capitalize' | 'lowercase' | 'uppercase';
  readonly textAlign?: 'center' | 'left' | 'right';
  readonly whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces';
  readonly onClick?: () => void;
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly maxContent?: boolean;
  readonly overflow?: 'hidden' | 'ellipsis' | 'clip';
}
