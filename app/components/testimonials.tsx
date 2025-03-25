import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "Quizmania has transformed how I study. The AI-generated questions are challenging and relevant to my interests.",
    name: "Alex Johnson",
    title: "Student",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "I use Quizmania with my students. It's an engaging way to reinforce learning and assess understanding.",
    name: "Sarah Williams",
    title: "Teacher",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The variety of topics and difficulty levels keeps me coming back. It's both fun and educational.",
    name: "Michael Chen",
    title: "Lifelong Learner",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Users Say
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
            Join thousands of satisfied users who are expanding their knowledge
            with Quizmania.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="aspect-square object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex flex-col">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
