import type { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient } from 'mongodb';

interface EventIdRequest extends NextApiRequest {
  query: {
    eventId?: string;
  };
  body: {
    email?: string;
    name?: string;
    text?: string;
  };
}

interface EventIdResponse extends NextApiResponse {}

const handler = async (req: EventIdRequest, res: EventIdResponse) => {
  const eventId = req.query.eventId;
  if (eventId === undefined) {
    res.status(400).json({ message: 'Invalid' });
    return;
  }

  const url = 'mongodb+srv://onioni:ZkNmGsQnuNBWxH2x@cluster0.oxcpg.mongodb.net/events?retryWrites=true&w=majority';
  const client = await MongoClient.connect(url);
  const db = client.db();

  switch (req.method) {
    case 'POST':
      const { email, name, text } = req.body;

      if (!email?.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
        res.status(422).json({ message: 'Invalid input.' });
        return;
      }

      const newComment: CommentData = {
        evnetId: eventId,
        email,
        name,
        text,
      };

      const result = await db.collection('comments').insertOne(newComment);

      newComment.id = result.insertedId.toString();
      console.log(result);

      res.status(201).json({ message: 'Added comment.', newComment });
      return;
    case 'GET':
      const documents = await db.collection('comments').find().sort({ _id: -1 }).toArray();

      res.status(200).json({ comments: documents });
      return;
    default:
      res.status(400).json({ message: 'Invalid' });
      return;
  }

  client.close();
};

export default handler;
