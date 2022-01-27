import type { NextApiRequest, NextApiResponse } from 'next';

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

export default function handler(req: EventIdRequest, res: EventIdResponse) {
  const eventId = req.query.eventId;

  switch (req.method) {
    case 'POST':
      const { email, name, text } = req.body;

      if (!email?.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
        res.status(422).json({ message: 'Invalid input.' });
        return;
      }

      const newComment = {
        id: new Date().toISOString(),
        email,
        name,
        text,
      };
      console.log(newComment);

      res.status(201).json({ message: 'Added comment.' });
    case 'GET':
      const dummyList = [
        { id: 'c1', name: 'Max', text: 'A first comment!' },
        { id: 'c2', name: 'Manuel', text: 'A second comment!' },
      ];

      res.status(200).json({ comments: dummyList });
    default:
      res.status(200).json({ message: 'Invalid' });
  }
}
