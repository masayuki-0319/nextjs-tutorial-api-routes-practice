import React, { createContext, ProviderProps, ReactNode } from 'react';

type NotificationType = {
  notification: Object | null;
  showNotification: Function;
  hideNotification: Function;
};

export const defaultNotification: NotificationType = {
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
};

const NotificationContext = createContext<NotificationType>(defaultNotification);

type Props = { value: NotificationType; children: ReactNode };
export const NotificationContextProvider = (props: Props) => {
  return <NotificationContext.Provider value={props.value}>{props.children}</NotificationContext.Provider>;
};
