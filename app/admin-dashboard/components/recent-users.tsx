"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { useEffect, useState } from "react"

export function RecentUsers() {
  const [recentUsers, setRecentUsers] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://quiz-mania-iota.vercel.app/admin/stats")
        console.log("response from dashboard", response.data)
        setRecentUsers(response.data.users)
      } catch (err) {
        console.error("Failed to fetch Admin stats:", err)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-4">
      {recentUsers.slice(0, 7).map((user) => {
        const lastActive = new Date(user?.lastLoginTime)
        const now = new Date()
        const diffInMs = now.getTime() - lastActive.getTime()
        const diffInHours = diffInMs / (1000 * 60 * 60)
        const userStatus = diffInHours > 24 ? "offline" : "online"

        return (
          <div key={user?._id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.picture} alt={user?.username} className="object-cover" />
                <AvatarFallback>
                  {user?.username.charAt(0)}
                  {user?.username.split(" ")[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{user?.username}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                <p className="text-xs text-muted-foreground">{new Date(user?.creationTime).toLocaleString()}</p>
              </div>
            </div>
            <Badge
              variant={userStatus === "online" ? "default" : "secondary"}
              className="capitalize"
            >
              {userStatus}
            </Badge>
          </div>
        )
      })}
    </div>
  )
}
