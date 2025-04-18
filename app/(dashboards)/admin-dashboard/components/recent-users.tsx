"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal"

export function RecentUsers() {
  const axiosInstanceNormal = UseAxiosNormal()

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get("/admin/stats")
      return res.data
    }
  })

  const recentUsers = data?.users || []

  return (
    <div className="space-y-4">
      {isLoading && <p className="text-muted-foreground">Loading recent users...</p>}
      {error && <p className="text-red-500">Failed to load users.</p>}
      {!isLoading && !error && recentUsers.slice(0, 7).map((user) => {
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
                  {user?.username?.charAt(0)}
                  {user?.username?.split(" ")[1]?.charAt(0)}
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
