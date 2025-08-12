import StudySessionClient from './StudySessionClient';

export default async function StudySessionPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  return <StudySessionClient groupId={groupId} />;
}
