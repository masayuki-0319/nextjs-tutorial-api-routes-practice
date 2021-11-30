import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/dist/client/router';

import EventList from '../../components/events/event-list';
import { EventSearch } from '../../components/events/event-search';
import { getAllEvents } from '../../hooks/dummy-data';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const AllEventsPage = (props: Props) => {
  const router = useRouter();

  const events = props.events;

  const findEventHandler = (year: string, month: string) => {
    const fullPath = `events/${year}/${month}`;
    console.log(fullPath);

    router.push(fullPath);
  };

  return (
    <div>
      <Head>
        <title>All Events | NextJS Events</title>
        <meta name='description' content='イベント一覧！' />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
