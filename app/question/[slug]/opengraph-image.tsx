import { OG_IMAGE_SIZE, renderQuestionCard } from './og-image-card';

export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';
export const alt = 'YourTravelGuide — verified travel answer';

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderQuestionCard(slug);
}
