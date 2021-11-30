import { VFC } from 'react';
import Link from 'next/link';

import classes from './button.module.css';

type Props = {
  link?: string;
  onClick?: (...k: any) => void;
  children: JSX.Element[] | string;
};

export const Button: VFC<Props> = (props) => {
  const { link, onClick, children } = props;

  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  } else {
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
  }
};
