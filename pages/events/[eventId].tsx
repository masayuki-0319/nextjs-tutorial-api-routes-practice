import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

import { EventContent } from '../../components/event-detail/event-content';
import { EventLogistics } from '../../components/event-detail/event-logistics';
import { EventSummary } from '../../components/event-detail/event-summary';
import { ErrorAlert } from '../../components/ui/error-alert';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import { Event } from '../../hooks/dummy-data';

type Props = {
  params: {
    selectedEvent: Event;
  };
};

const EventDetailPage = (props: Props) => {
  const event = props.params?.selectedEvent;
  console.log(props);

  if (!event) {
    return (
      <div className='center'>
        <Head>
          <title>No Event | NextJS Events</title>
          <meta name='description' content='イベントが見つかりません' />
        </Head>

        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title} | NextJS Events</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
        image={event.image}
        title={event.title}
        id={event.id}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const eventId = context.params!.eventId as string;

  const event = await getEventById(eventId);

  return {
    props: {
      params: {
        selectedEvent: event,
      },
      revalidate: 30,
    },
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => {
    return {
      params: {
        eventId: event.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export default EventDetailPage;
