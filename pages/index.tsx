import Head from 'next/head';

import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';
import { InferGetStaticPropsType } from 'next';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const HomePage = (props: Props) => {
  const { events } = props;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='いろいろなイベントが見つかるよ！' />
      </Head>
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const allEvents = await getFeaturedEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
