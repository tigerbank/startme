import { FeedbackItemProps } from 'interfaces/common';
import { buildFeedbackPath, extractFeedback } from 'pages/api/feedback';

function handler(req: any, res: any) {
  const filePath = buildFeedbackPath();
  const feedbackId = req.query.feedbackId;
  const data = extractFeedback(filePath);
  const selectedFeedback = data.find(
    (feedback: FeedbackItemProps) => feedback.id === feedbackId,
  );

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
