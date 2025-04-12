"use client"

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    users: 400,
    quizzes: 240,
    completions: 320,
  },
  {
    name: "Feb",
    users: 450,
    quizzes: 260,
    completions: 380,
  },
  {
    name: "Mar",
    users: 520,
    quizzes: 290,
    completions: 430,
  },
  {
    name: "Apr",
    users: 580,
    quizzes: 320,
    completions: 490,
  },
  {
    name: "May",
    users: 650,
    quizzes: 340,
    completions: 520,
  },
  {
    name: "Jun",
    users: 720,
    quizzes: 380,
    completions: 580,
  },
  {
    name: "Jul",
    users: 800,
    quizzes: 410,
    completions: 650,
  },
  {
    name: "Aug",
    users: 870,
    quizzes: 440,
    completions: 720,
  },
  {
    name: "Sep",
    users: 950,
    quizzes: 480,
    completions: 790,
  },
  {
    name: "Oct",
    users: 1020,
    quizzes: 510,
    completions: 860,
  },
  {
    name: "Nov",
    users: 1100,
    quizzes: 550,
    completions: 920,
  },
  {
    name: "Dec",
    users: 1200,
    quizzes: 600,
    completions: 1000,
  },
]

export function OverviewStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }} labelStyle={{ color: "#333" }} />
        <Legend />
        <Line type="monotone" dataKey="users" name="Users" stroke="hsl(var(--primary))" strokeWidth={2} />
        <Line type="monotone" dataKey="quizzes" name="Quizzes" stroke="hsl(var(--secondary))" strokeWidth={2} />
        <Line type="monotone" dataKey="completions" name="Completions" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
