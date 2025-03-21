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

interface QuizCardProps {
  title: string;
  description: string;
  category: string;
  duration: string;
  questions: number;
  className?: string;
}

export function QuizCard({
  title,
  description,
  category,
  duration,
  questions,
  className,
}: QuizCardProps) {
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {category}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Brain className="mr-1 h-4 w-4" />
          {questions} questions
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Start Quiz</Button>
      </CardFooter>
    </Card>
  );
}
