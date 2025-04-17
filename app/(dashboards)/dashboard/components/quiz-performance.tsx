"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export function QuizPerformance() {
  const [data, setData] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`
https://quiz-mania-iota.vercel.app/user/stats/${session?.user?.email}`);
        const solvedQuizzes = res.data.solvedQuiz;

        // Group and structure topic-wise data
        const topicMap: Record<
          string,
          { topic: string; total: number; correct: number }
        > = {};

        solvedQuizzes.forEach((quiz: any) => {
          const topic = quiz.quizCriteria.topic;
          if (!topicMap[topic]) {
            topicMap[topic] = {
              topic,
              total: 0,
              correct: 0,
            };
          }

          topicMap[topic].total += quiz.parsedQuizData.length;
          topicMap[topic].correct += quiz.correctQuizAnswer;
        });

        // Convert to chart-ready format
        const formatted = Object.values(topicMap).map((item) => ({
          name: item.topic.charAt(0).toUpperCase() + item.topic.slice(1),
          score: Math.round((item.correct / item.total) * 100),
          average: Math.floor(Math.random() * 30) + 60, // Fake average (e.g., for now)
        }));

        setData(formatted);
      } catch (error) {
        console.error("Error fetching user quiz stats:", error);
      }
    };

    fetchStats();
  }, [session?.user?.email]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, "Score"]}
          labelStyle={{ color: "#fff" }}
          contentStyle={{
            backgroundColor: "#000000",
            border: "1px solid #ccc",
          }}
        />
        <Legend />
        <Bar
          dataKey="score"
          name="Your Score"
          fill="#8B5CF6"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="average"
          name="Class Average"
          fill="#9E77F9"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
