"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

const data = [
  {
    name: "Math",
    score: 85,
    average: 72,
  },
  {
    name: "Science",
    score: 78,
    average: 68,
  },
  {
    name: "History",
    score: 92,
    average: 75,
  },
  {
    name: "English",
    score: 88,
    average: 80,
  },
  {
    name: "Geography",
    score: 76,
    average: 65,
  },
  {
    name: "Computer",
    score: 95,
    average: 78,
  },
]

export function QuizPerformance() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
          contentStyle={{ backgroundColor: "#000000", border: "1px solid #ccc" }}
        />
        <Legend />
        <Bar dataKey="score" name="Your Score" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="average" name="Class Average" fill="#9E77F9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
