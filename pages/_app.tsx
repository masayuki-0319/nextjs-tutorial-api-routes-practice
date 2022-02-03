import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from '../components/layout/layout';
import { Notification } from '../components/ui/notification';
import { defaultNotification, NotificationContextProvider } from '../store/notification-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider value={defaultNotification}>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="NextJS Events" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
        <Notification title="Test" message="This is a test" status="success" />
      </Layout>
    </NotificationContextProvider>
  );
}
export default MyApp;
