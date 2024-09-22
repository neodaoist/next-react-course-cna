import Link from 'next/link';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!);

type Quiz = {
  quiz_id: number;
  title: string;
};

async function Quizzes() {
  try {
    const quizzes: Quiz[] = await sql`
      SELECT * FROM quizzes
    `;
    console.log('Fetched quizzes:', quizzes);
    return (
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.quiz_id}>
            <Link href={`/quiz/${quiz.quiz_id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    console.error('Database error:', error);
    return <div>{error as string}</div>;
  }
}

export default function Home() {
  return (
    <section>
      <h1>All Quizzes</h1>
      <Quizzes />
    </section>
  );
}
