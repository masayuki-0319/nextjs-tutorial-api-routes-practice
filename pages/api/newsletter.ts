import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const connectDatabase = async () => {
  const url = 'mongodb+srv://onioni:ZkNmGsQnuNBWxH2x@cluster0.oxcpg.mongodb.net/newsletter?retryWrites=true&w=majority';
  const client = await MongoClient.connect(url);

  return client;
};

const insertDocument = async (client: MongoClient, document: Object) => {
  const db = client.db();

  await db.collection('emails').insertOne(document);
};

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

    let client: any;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
