// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { renderMessage } from '@/util/mail';
const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

type Data = {
  status: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { user } = req.body;

  const message = renderMessage(req.body);

  const data = {
    to: 'bank_hpk@hotmail.com',
    from: 'mail@teerasakyukan.com',
    Subject: 'Order submit from Teerasakyukan user: ' + user,
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  };
  mail.send(data);
  res.status(200).json({ status: 'OK' });
}
