import { useContext, VFC } from 'react';
import { NotificationContext } from '../../store/notification-context';

import classes from './notification.module.css';

type Props = {
  title: string;
  message: string;
  status: string;
};

export const Notification: VFC<Props> = (props) => {
  const { title, message, status } = props;

  const notificationCtx = useContext(NotificationContext);

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={() => notificationCtx.hideNotification()}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};
