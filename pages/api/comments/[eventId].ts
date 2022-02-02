import type { NextApiRequest, NextApiResponse } from 'next';

import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util';

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

  let client: any;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  switch (req.method) {
    case 'POST':
      const { email, name, text } = req.body;
      if (!email?.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
        res.status(422).json({ message: 'Invalid input.' });
        client.close();
        return;
      }

      const newComment: CommentData = {
        evnetId: eventId,
        email,
        name,
        text,
      };

      let result;
      try {
        result = await insertDocument(client, 'events', newComment);
        newComment._id = result.insertedId.toString();

        res.status(201).json({ message: 'Added comment.', newComment });
      } catch (error) {
        res.status(500).json({ message: 'Inserting data failed!', error: error });
      }
    case 'GET':
      let documents: any;
      try {
        documents = await getAllDocuments(client, 'comments', { _id: -1 });

        res.status(200).json({ comments: documents });
      } catch (error) {
        res.status(500).json({ message: 'Getting comments failed!' });
      }
    default:
      client.close();
      return;
  }
};

export default handler;
