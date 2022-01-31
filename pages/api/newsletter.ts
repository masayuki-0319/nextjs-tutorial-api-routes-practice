import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

interface NewsletterRequest extends NextApiRequest {
  body: {
    email?: string;
  };
}

const handler = async (req: NewsletterRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });

      return;
    }

    const url =
      'mongodb+srv://onioni:ZkNmGsQnuNBWxH2x@cluster0.oxcpg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const client = await MongoClient.connect(url);
    const db = client.db();
    await db.collection('emails').insertOne({ email: userEmail });
    client.close();

    console.log(userEmail);
    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
