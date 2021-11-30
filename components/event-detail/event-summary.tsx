import { VFC } from 'react';
import { Event } from '../../hooks/dummy-data';
import classes from './event-summary.module.css';

type Props = {
  [K in keyof Pick<Event, 'title'>]: Event[K];
};

const EventSummary: VFC<Props> = (props) => {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export { EventSummary };
