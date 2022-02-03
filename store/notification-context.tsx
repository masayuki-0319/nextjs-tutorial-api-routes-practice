import React, { createContext, ProviderProps, ReactNode, useEffect, useState } from 'react';

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

export const NotificationContext = createContext<NotificationType>(defaultNotification);

export const NotificationContextProvider = (props: { children: ReactNode }) => {
  const [activeNotification, setActiveNotification] = useState<null | Notification>(null);

  useEffect(() => {
    if (activeNotification && ['success', 'error'].includes(activeNotification.status)) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

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
