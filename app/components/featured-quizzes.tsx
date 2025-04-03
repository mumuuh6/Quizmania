import { QuizCard } from "./quiz-card";

const quizzes = [
  {
    topic: "Science Fundamentals",
    description:
      "Test your knowledge of basic scientific principles and discoveries.",
    category: "Science",
    difficulty: "Easy",
    quizType: "mcq",
    duration: "10 min",
    quantity: 15,
  },
  {
    topic: "World History Challenge",
    description:
      "Explore key historical events and figures from around the globe.",
    category: "History",
    difficulty: "expert",
    quizType: "t/f",
    duration: "15 min",
    quantity: 20,
  },
  {
    topic: "Tech Innovations",
    description: "How well do you know the latest technological breakthroughs?",
    category: "Technology",
    difficulty: "Medium",
    quizType: "mcq",
    duration: "12 min",
    quantity: 18,
  },
  {
    topic: "Geography Explorer",
    description: "Test your knowledge of countries, capitals, and landmarks.",
    category: "Geography",
    difficulty: "diffifult",
    quizType: "t/f",
    duration: "10 min",
    quantity: 15,
  },
];

export function FeaturedQuizzes() {
  return (
    <section id="featured-quizzes" className="py-16 md:py-24">
      <div className="container mx-auto px-2">
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
              topic={quiz.topic}
              description={quiz.description}
              category={quiz.category}
              difficulty= {quiz.difficulty}
              quizType={quiz.difficulty}
              duration={quiz.duration}
              quantity={quiz.quantity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
