import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import EventList from '../../components/events/event-list';
import { ResultTitle } from '../../components/events/result-title';
import { Button } from '../../components/ui/button';
import { ErrorAlert } from '../../components/ui/error-alert';
import type { Event } from '../../hooks/dummy-data';

// type RemovePromise<T> = T extends Promise<infer R> ? R : never;
// type Props = RemovePromise<ReturnType<typeof getServerSideProps>>['props'];

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>();
  const router = useRouter();

  const filterData = router.query.slug as string[];

  const fetcher = async (url: string) => {
    const events = [];

    const data = await fetch(url).then((r) => r.json());
    console.log(data);

    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
    return events;
  };

  const { data, error } = useSWR(
    'https://nextjs-tutorial-ssr-practice-default-rtdb.firebaseio.com/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      setLoadedEvents(data);
    }
    console.log(filterData);
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events | NextJS Events</title>
      <meta name='description' content={'A list of filtered events.'} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events | NextJS Events</title>
      <meta
        name='description'
        content={`All events for ${numYear}/${numMonth}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { params } = context;

//   const filterData = params!.slug as [string, string];

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   const filteredEvent = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   if (!filteredEvent || filteredEvent.length === 0) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error',
//       // },
//     };
//   }

//   return {
//     props: {
//       hasError: false,
//       events: filteredEvent,
//       year: numYear,
//       month: numMonth,
//     },
//   };
// };

export default FilteredEventsPage;
