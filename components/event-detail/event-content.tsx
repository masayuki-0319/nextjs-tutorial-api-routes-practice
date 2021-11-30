import { VFC } from 'react';
import classes from './event-content.module.css';

type Props = {
  children: JSX.Element;
};

const EventContent: VFC<Props> = (props) => {
  return <section className={classes.content}>{props.children}</section>;
};

export { EventContent };
