import { sendGridsubscribeMail } from '@/util/api';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'PUT') {
    try {
      await sendGridsubscribeMail(req.body.email);
      res.status(200).json({
        message: 'Your email has been succesfully added to the mailing list.',
      });
    } catch (error) {
      res.status(500).send({
        message:
          'Oops, there was a problem with your subscription, please try again or contact us',
      });
    }
  }
}
