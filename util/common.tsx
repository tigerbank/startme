import fs from 'fs';
import path from 'path';

export function buildEventPath() {
  return path.join(process.cwd(), 'data', 'event.json');
}

export function extractEvent(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
}

export function buildPropertyPath() {
  return path.join(process.cwd(), 'pages/real-estate/data', 'property.json');
}

export function extractProperty(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
}
