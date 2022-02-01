import { VFC } from 'react';
import classes from './comment-list.module.css';

type Props = {
  items: Required<CommentData>[];
};

export const CommentList: VFC<Props> = (props) => {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {items.map((item, index) => {
        return (
          <li key={index}>
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
