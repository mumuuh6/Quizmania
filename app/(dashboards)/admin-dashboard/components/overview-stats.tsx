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
import { useQuery } from "@tanstack/react-query"
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal"

export function OverviewStats() {
  const axiosInstanceNormal = UseAxiosNormal()

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get("/admin/stats")
      return res.data
    }
  })

  const chartData = data?.users && data?.quizzes && data?.solvedQuizzes ? [
    {
      name: "Total",
      users: data.users.length,
      quizzes: data.quizzes.length,
      completions: data.solvedQuizzes.length,
    }
  ] : [
    { name: "Loading", users: 0, quizzes: 0, completions: 0 }
  ]

  if (error) {
    return <p style={{ color: "red" }}>Failed to load stats.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={isLoading ? [{ name: "Loading", users: 0, quizzes: 0, completions: 0 }] : chartData}>
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
