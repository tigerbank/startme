import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    //serverside validation
    if (!email) {
      res.status(400).json({
        message: 'Email is required',
      });
      return;
    }

    //store in database
    res.status(201).json({
      message: 'signed Up!',
    });
  } else {
    res.status(200).json({
      message: 'this work',
    });
  }
}
