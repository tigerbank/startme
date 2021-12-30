import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
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
    res.status(200).json({ message: 'This is working' });
  }
}
