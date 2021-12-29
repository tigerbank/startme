import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'mocks/data', 'feedback.json');
}

export function extractFeedback(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
}

function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.feedback;

    const newFeedBack = {
      id: new Date().toISOString(),
      email,
      feedbackText,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedBack);
    fs.writeFileSync(filePath, JSON.stringify(data));

    if (!feedbackText || !email) {
      res.status(400).send('Feedback is missing required fields');
    } else {
      res.status(201).json({ message: 'success!', feedback: newFeedBack });
    }
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
