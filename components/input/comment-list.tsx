import { VFC } from 'react';
import classes from './comment-list.module.css';

type Props = {
  items: Required<CommentData>[];
};

export const CommentList: VFC<Props> = (props) => {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
