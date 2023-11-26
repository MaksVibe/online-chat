import Link from 'next/link';
import { FC } from 'react';
import styles from './Button.module.scss';

type ButtonPropsType = {
  main?: boolean;
  text?: string;
};

export const Button: FC<ButtonPropsType> = ({ main, text }) => {
  return main ? (
    <Link href={'/'} className={`${styles.commonButtonStyles} mx-auto`}>
      {text}
    </Link>
  ) : (
    <></>
  );
};
