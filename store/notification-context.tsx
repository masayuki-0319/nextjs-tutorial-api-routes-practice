import React, { createContext, ProviderProps, ReactNode, useState } from 'react';

type Notification = {
  title: string;
  message: string;
  status: string;
};

type NotificationType = {
  notification: Notification | null;
  showNotification: Function;
  hideNotification: Function;
};

const defaultNotification: NotificationType = {
  notification: null,
  showNotification: (notificationData: Notification) => {},
  hideNotification: () => {},
};

const NotificationContext = createContext<NotificationType>(defaultNotification);

export const NotificationContextProvider = (props: { children: ReactNode }) => {
  const [activeNotification, setActiveNotification] = useState<null | Notification>(null);

  const showNotificationHandler = (notificationData: Notification) => {
    setActiveNotification(notificationData);
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>;
};
