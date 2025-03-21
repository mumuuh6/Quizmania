import { Brain, Lightbulb, Trophy, UserCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    title: "Choose a Topic",
    description:
      "Select from our wide range of quiz categories or request a custom topic.",
    icon: <Brain className="h-12 w-12 text-primary" />,
  },
  {
    title: "AI Generates Questions",
    description:
      "Our AI creates personalized questions based on your skill level and interests.",
    icon: <Lightbulb className="h-12 w-12 text-primary" />,
  },
  {
    title: "Take the Quiz",
    description: "Answer questions, get instant feedback, and learn as you go.",
    icon: <UserCircle className="h-12 w-12 text-primary" />,
  },
  {
    title: "Track Your Progress",
    description:
      "See your scores, track improvement, and compete with friends.",
    icon: <Trophy className="h-12 w-12 text-primary" />,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
            Our AI-powered platform makes learning fun and engaging. Here's how
            Quizmania works.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 border-muted bg-background">
              <CardHeader className="pb-2">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <CardTitle className="text-center text-xl">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
