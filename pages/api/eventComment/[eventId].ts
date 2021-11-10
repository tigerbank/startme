import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    const { name, email, comment } = req.body;
    //Server-side validation
    if (!name || !email || !comment) {
      res.status(422).json({
        message: 'Please fill in all fields',
      });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      name,
      email,
      comment,
    };

    res.status(201).json({
      message: 'Success Added',
      comment: newComment,
    });
  } else {
    const dummyList = [
      {
        id: '1',
        name: 'John Doe',
        email: 'tset@mail.com',
        comment: 'Hello World',
      },
      {
        id: '2',
        name: 'John ddd',
        email: 'tset@mail.com',
        comment: 'Hello World111',
      },
    ];

    res.status(200).json({ message: 'This is working' });
  }
}
