import { NextApiRequest, NextApiResponse } from 'next';

interface NewsletterRequest extends NextApiRequest {
  body: {
    email?: string;
  };
}

const handler = (req: NewsletterRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });

      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
