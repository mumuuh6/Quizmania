import { QuizCard } from "./quiz-card";

const quizzes = [
  {
    id:1,
    topic: "Science Fundamentals",
    description:
      "Test your knowledge of basic scientific principles and discoveries.",
    category: "Science",
    difficulty: "Easy",
    quizType: "mcq",
    timeLimit: "10 min",
    quantity: 15,
  },
  {
    id:2,
    topic: "World History Challenge",
    description:
      "Explore key historical events and figures from around the globe.",
    category: "History",
    difficulty: "expert",
    quizType: "true or false",
    timeLimit: "15 min",
    quantity: 20,
  },
  {
    id:3,
    topic: "Tech Innovations",
    description: "How well do you know the latest technological breakthroughs?",
    category: "Technology",
    difficulty: "Medium",
    quizType: "mcq",
    timeLimit: "12 min",
    quantity: 18,
  },
  {
    id:4,
    topic: "Geography Explorer",
    description: "Test your knowledge of countries, capitals, and landmarks.",
    category: "Geography",
    difficulty: "diffifult",
    quizType: "true or false",
    timeLimit: "10 min",
    quantity: 15,
  },
  {
    id:5,
    topic: "Literature Classics",
    description:
      "Dive into the world of classic literature and famous authors.",
    category: "Literature",
    difficulty: "Easy",
    quizType: "mcq",
    timeLimit: "8 min",
    quantity: 10,
  },
  {
    id:6,
    topic: "Mathematics Mastery",
    description:
      "Challenge your math skills with problems from various branches.",
    category: "Mathematics",
    difficulty: "Medium",
    quizType: "true or false",
    timeLimit: "15 min",
    quantity: 20,
  },
  {
    id:7,
    topic: "Art and Culture",
    description:
      "Explore the world of art, music, and cultural movements.",
    category: "Arts",
    difficulty: "expert",
    quizType: "mcq",
    timeLimit: "12 min",
    quantity: 18,
  },
  {
    id:8,
    topic: "Sports Trivia",
    description:
      "Test your knowledge of sports history, athletes, and events.",
    category: "Sports",
    difficulty: "Easy",
    quizType: "true or false",
    timeLimit: "10 min",
    quantity: 15,
  }
];

export function FeaturedQuizzes() {
  return (
    <section id="featured-quizzes" className="py-16 md:py-24">
      <div className="md:w-[95%] mx-auto px-2">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Quizzes
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
            Explore our collection of AI-generated quizzes across various
            topics. Challenge yourself and expand your knowledge.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quizzes.map((quiz, index) => (
            <QuizCard
              key={index}
              topic={quiz.topic}
              description={quiz.description}
              category={quiz.category}
              difficulty= {quiz.difficulty}
              quizType={quiz.quizType}
              timeLimit={quiz.timeLimit}
              quantity={quiz.quantity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
