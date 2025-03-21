import { QuizCard } from "./quiz-card";

const quizzes = [
  {
    title: "Science Fundamentals",
    description:
      "Test your knowledge of basic scientific principles and discoveries.",
    category: "Science",
    duration: "10 min",
    questions: 15,
  },
  {
    title: "World History Challenge",
    description:
      "Explore key historical events and figures from around the globe.",
    category: "History",
    duration: "15 min",
    questions: 20,
  },
  {
    title: "Tech Innovations",
    description: "How well do you know the latest technological breakthroughs?",
    category: "Technology",
    duration: "12 min",
    questions: 18,
  },
  {
    title: "Geography Explorer",
    description: "Test your knowledge of countries, capitals, and landmarks.",
    category: "Geography",
    duration: "10 min",
    questions: 15,
  },
];

export function FeaturedQuizzes() {
  return (
    <section id="featured-quizzes" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Quizzes
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
            Explore our collection of AI-generated quizzes across various
            topics. Challenge yourself and expand your knowledge.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quizzes.map((quiz, index) => (
            <QuizCard
              key={index}
              title={quiz.title}
              description={quiz.description}
              category={quiz.category}
              duration={quiz.duration}
              questions={quiz.questions}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
