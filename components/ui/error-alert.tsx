import { VFC } from 'react';

import classes from './error-alert.module.css';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const ErrorAlert: VFC<Props> = (props) => {
  const { children } = props;

  return <div className={classes.alert}>{children}</div>;
};
