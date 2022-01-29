import { useEffect, useState, VFC } from 'react';

import { CommentList } from './comment-list';
import { NewComment } from './new-comment';
import classes from './comments.module.css';

type Props = {
  eventId: string;
};

export const Comments: VFC<Props> = (props) => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Required<CommentData>[]>([]);

  useEffect(() => {
    if (showComments) {
      fetch('/api/comments/' + eventId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setComments(data.comments));
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: CommentData) {
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};
