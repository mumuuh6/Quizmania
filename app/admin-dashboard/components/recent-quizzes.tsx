import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from "axios"
import { Eye, Edit, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"



export function RecentQuizzes() {
  const [recentQuizzes,setRecentQuizzes]=useState([])
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://quiz-mania-iota.vercel.app/admin/stats")
        console.log("response from dashboard", response.data)
        setRecentQuizzes(response.data.quizzes)
      } catch (err) {
        console.error("Failed to fetch Admin stats:", err)
      }
    }

    fetchStats()
  }, [])
  return (
    <div className="rounded-md border">
      {/* table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Topic</TableHead>
            <TableHead>Author Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentQuizzes.slice(0,5).map((quiz, index) => (
            <TableRow key={index} >
              <TableCell className="font-medium capitalize">{quiz?.quizCriteria?.topic}</TableCell>
              <TableCell>{quiz?.user}</TableCell>
              <TableCell>
                <Badge
                  variant={quiz.status === "solved" ? "default" : "destructive"}
                  className="capitalize"
                >
                  {quiz?.status || "Not Solved"}
                </Badge>
              </TableCell>
              <TableCell>{quiz?.parsedQuizData?.length}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    quiz?.quizCriteria?.difficulty === "easy" ? "outline" : quiz?.quizCriteria?.difficulty === "medium" ? "secondary" : "default"
                  }
                  className="capitalize"
                >
                  {quiz?.quizCriteria?.difficulty}
                </Badge>
              </TableCell>
              <TableCell>{quiz?.quizCriteria?.created}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
