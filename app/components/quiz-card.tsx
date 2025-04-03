import { Brain, Clock, Tag } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import path from "path";

interface QuizCardProps {
  topic: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
  quizType: string;
  quantity: number;
  className?: string;
}

export function QuizCard({
  topic,
  description,
  category,
  duration,
  difficulty,
  quizType,
  quantity,
  className,
}: QuizCardProps) {
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {quizType}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1">{topic}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Brain className="mr-1 h-4 w-4" />
          {quantity} quantity
        </div>
      </CardContent>
      <CardFooter>
        <Link href={
          {
            pathname:"Quizzes/create",
            query: {
              topic: topic,
              description: description,
              category: category,
              duration: duration,
              difficulty: difficulty,
              quizType: quizType,
              quantity: quantity,
            },
          }
        }><Button className="w-full">Start Quiz</Button></Link>
      </CardFooter>
    </Card>
  );
}
