"use client"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useEffect, useState } from "react"
import axios from "axios"

export function OverviewStats() {
  const [chartData, setChartData] = useState([
    { name: "Loading", users: 0, quizzes: 0, completions: 0 },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://quiz-mania-iota.vercel.app/admin/stats")
        const { users, quizzes, solvedQuizzes } = res.data

        const transformedData = [
          {
            name: "Total",
            users: users.length,
            quizzes: quizzes.length,
            completions: solvedQuizzes.length,
          },
        ]

        setChartData(transformedData)
      } catch (error) {
        console.error("Failed to fetch stats", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
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
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
          labelStyle={{ color: "#333" }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          name="Users"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="quizzes"
          name="Quizzes"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="completions"
          name="Completions"
          stroke="#10b981"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
