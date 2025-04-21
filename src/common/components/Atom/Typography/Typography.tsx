import { css } from '@emotion/css';
import clsx from 'clsx';
import { useMemo } from 'react';
import { TypographyProps } from 'src/common/components/Atom/Typography/type';
import { addPx } from 'src/common/untils/addPx';
import typographyClass from './Typography.module.scss';
/**
 * It’s a reusable component designed to render an Text
 */
export function Typography({
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  textAlign,
  textDecoration,
  color,
  whiteSpace,
  textTransform,
  lineHeight,
  letterSpacing,
  variant = 'text',
  maxContent,
  onClick,
  className,
  children,
  overflow,
  ...props
}: Readonly<TypographyProps>) {
  const classText = useMemo(() => {
    const classArr = [
      typographyClass.typography,
      typographyClass[`heading--${variant}`],
      typographyClass[`font-family--${fontFamily}`],
      typographyClass[`font-size--${fontSize}`],
      typographyClass[`font-style--${fontStyle}`],
      typographyClass[`font-weight--${fontWeight}`],
      typographyClass[`text-decoration--${textDecoration}`],
      typographyClass[`text-align--${textAlign}`],
      typographyClass[`white-space--${whiteSpace}`],
      typographyClass[`text-transform--${textTransform}`],
      typographyClass[`overflow--${overflow}`],
      maxContent ? typographyClass.max__content : '',
      className,
    ];

    return classArr.join(' ').trim();
  }, [
    variant,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    textDecoration,
    textAlign,
    whiteSpace,
    textTransform,
    overflow,
    maxContent,
    className,
  ]);

  const HeadingLevel = `${variant !== 'h7' ? variant : 'h6'}` as keyof JSX.IntrinsicElements;

  return variant === 'text' ? (
    <p
      onClick={onClick}
      aria-hidden="true"
      className={clsx(
        css`
          color: ${color};
          line-height: ${addPx(lineHeight)};
          letter-spacing: ${addPx(letterSpacing)};
        `,
        classText,
      )}
      {...props}
    >
      {children}
    </p>
  ) : (
    <HeadingLevel
      onClick={onClick}
      className={clsx(
        css`
          color: ${color};
          line-height: ${addPx(lineHeight)};
          letter-spacing: ${addPx(letterSpacing)};
        `,
        classText,
      )}
      {...props}
    >
      {children}
    </HeadingLevel>
  );
}
