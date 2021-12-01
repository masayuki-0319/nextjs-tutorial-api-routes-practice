import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';

import EventList from '../components/events/event-list';
import { NewsletterRegistration } from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../helpers/api-util';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const HomePage = (props: Props) => {
  const { events } = props;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='いろいろなイベントが見つかるよ！' />
      </Head>
      <NewsletterRegistration />
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
