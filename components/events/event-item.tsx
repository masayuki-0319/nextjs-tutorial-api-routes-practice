import { VFC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Event } from '../../hooks/dummy-data';
import classes from './event-item.module.css';
import { Button } from '../ui/button';
import { DateIcon } from '../icons/date-icon';
import { AddressIcon } from '../icons/address-icon';
import { ArrowRightIcon } from '../icons/arrow-right-icon';

type Props = {
  [K in keyof Pick<
    Event,
    'title' | 'image' | 'date' | 'location' | 'id'
  >]: Event[K];
};

const EventItem: VFC<Props> = (props) => {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattetAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={image} alt={title} width='250' height='160' />
      <div className={classes.content}>
        <h2 className={classes.summary}>{title}</h2>
        <div className={classes.date}>
          <DateIcon />
          <time>{humanReadableDate}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formattetAddress}</address>
        </div>
        <div className={classes.action}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
