import { useContext, VFC } from 'react';
import { MainHeader } from './main-header';

import { Notification } from '../ui/notification';
import { NotificationContext } from '../../store/notification-context';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const Layout: VFC<Props> = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};
