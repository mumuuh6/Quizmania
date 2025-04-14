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
    avatar: "https://i.ibb.co.com/7xwrHFDS/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-g.jpg",
  },
  {
    quote:
      "I use Quizmania with my students. It's an engaging way to reinforce learning and assess understanding.",
    name: "Sarah Williams",
    title: "Teacher",
    avatar: "https://i.ibb.co.com/prhxSndT/download.jpg",
  },
  {
    quote:
      "The variety of topics and difficulty levels keeps me coming back. It's both fun and educational.",
    name: "Michael Chen",
    title: "Lifelong Learner",
    avatar: "https://i.ibb.co.com/XPQRs9x/istockphoto-1014065698-612x612.jpg",
  },
  {
    quote:
      "Quizmania has transformed how I study. The AI-generated questions are challenging and relevant to my interests.",
    name: "Karen Gillan",
    title: "Software Engineer",
    avatar: "https://i.ibb.co.com/VcxTWFdP/download-1.jpg",
  },
  {
    quote:
      "I use Quizmania with my students. It's an engaging way to reinforce learning and assess understanding.",
    name: "Thompson Ryan",
    title: "Entrepreneur",
    avatar: "https://i.ibb.co.com/k6h4YgmK/images.jpg",
  },
  {
    quote:
      "The variety of topics and difficulty levels keeps me coming back. It's both fun and educational.",
    name: "Zoe Saladana",
    title: "Sports Coach",
    avatar: "https://i.ibb.co.com/bgrW3C9t/download-2.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="md:w-[95%] mx-auto px-2">
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
                    className="aspect-square object-cover object-center"
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
