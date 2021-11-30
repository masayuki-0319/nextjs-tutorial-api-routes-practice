import { VFC } from 'react';
import classes from './logistics-item.module.css';

type Props = {
  icon: any;
  children: JSX.Element;
};

const LogisticsItem: VFC<Props> = (props) => {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
};

export { LogisticsItem };
