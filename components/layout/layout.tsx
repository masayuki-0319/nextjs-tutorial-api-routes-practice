import { VFC } from 'react';
import { MainHeader } from './main-header';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const Layout: VFC<Props> = (props) => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
};
