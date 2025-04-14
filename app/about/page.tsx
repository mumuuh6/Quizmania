import Image from "next/image";
import { Brain, CheckCircle, Users } from "lucide-react";
import Quizmania from "@/public/quizmania.png"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section  */}
        <section className="bg-muted/50 py-16 md:py-24  px-2">
          <div className="md:w-[95%] mx-auto">
            <div className="grid gap-8 md:grid-cols-2 md:gap-8 justify-center items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  About Quizmania
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                At QuizMania, our mission is to revolutionize the way people learn by transforming education into a more enjoyable, interactive, and tailored experience, all made possible through the innovative use of artificial intelligence.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-md">
                  <Image
                    src={Quizmania}
                    alt="About Quizmania"
                    className="rounded-2xl object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24  px-2">
          <div className="md:w-[95%] mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Our Story
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Quizmania was founded in 2023 by a team of educators and AI
                  enthusiasts who saw the potential of artificial intelligence
                  to transform how we learn and test our knowledge.
                </p>
                <p>
                  We started with a simple idea: what if quizzes could adapt to
                  each person's interests, knowledge level, and learning style?
                  What if they could be both challenging and fun?
                </p>
                <p>
                  Today, Quizmania serves thousands of users worldwide, from
                  students preparing for exams to lifelong learners who simply
                  enjoy expanding their knowledge. Our AI-powered platform
                  generates personalized quizzes across hundreds of topics,
                  making learning an engaging and rewarding experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-muted/50 py-16 md:py-24  px-2">
          <div className="md:w-[95%] mx-auto">
            <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Values
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Brain className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-medium">Innovation</h3>
                <p className="mt-2 text-muted-foreground">
                  We continuously improve our AI algorithms to create better,
                  more personalized learning experiences.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-medium">Quality</h3>
                <p className="mt-2 text-muted-foreground">
                  We're committed to providing accurate, well-researched content
                  that truly helps you learn.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-medium">Inclusivity</h3>
                <p className="mt-2 text-muted-foreground">
                  We design our platform to be accessible to learners of all
                  backgrounds, ages, and skill levels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24  px-2">
          <div className="md:w-[95%] mx-auto">
            <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">
              Meet Our Team
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Jaber Ahmed Riyan",
                  role: "Backend Developer",
                  bio: "Former educator with a passion for AI and learning technologies.",
                  image: "https://i.ibb.co.com/N27VRy61/Whats-App-Image-2024-06-16-at-21-17-30-339e9296.jpg",
                },
                {
                  name: "Ifratul Jannat Ritu",
                  role: "UI/UX Designer",
                  bio: "AI researcher with expertise in natural language processing and adaptive learning.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Mahmuda Akter mumu",
                  role: "Frontend Developer",
                  bio: "Educational content specialist with a background in curriculum development.",
                  image: "https://lh3.googleusercontent.com/a/ACg8ocLmuPEKDHpuj5xJlTINwgZ46x3yiEAv1JN0OZGtOqbvpVWAnkY=s192-c-rg-br100",
                },
                {
                  name: "Salman Izhar",
                  role: "Lead Developer",
                  bio: "Full-stack developer with a focus on AI and machine learning applications.",
                  image: "https://i.ibb.co.com/YBRJnfkZ/profilepick.jpg",
                },
                {
                  name: "Abdur Rahman",
                  role: "Marketing Manager",
                  bio: "Digital marketing expert with a passion for education and technology.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                
              ].map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="aspect-square object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-medium">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
