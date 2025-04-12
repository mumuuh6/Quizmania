import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserItem {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "pending"
  joinDate: string
  avatar?: string
}

const recentUsers: UserItem[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    joinDate: "2 days ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "active",
    joinDate: "3 days ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "u3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    status: "pending",
    joinDate: "5 days ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "u4",
    name: "Emily Wilson",
    email: "emily.w@example.com",
    status: "active",
    joinDate: "1 week ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "u5",
    name: "Robert Garcia",
    email: "robert.g@example.com",
    status: "inactive",
    joinDate: "1 week ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function RecentUsers() {
  return (
    <div className="space-y-4">
      {recentUsers.map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.charAt(0)}
                {user.name.split(" ")[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">{user.joinDate}</p>
            </div>
          </div>
          <Badge
            variant={user.status === "active" ? "default" : user.status === "pending" ? "secondary" : "outline"}
            className="capitalize"
          >
            {user.status}
          </Badge>
        </div>
      ))}
    </div>
  )
}
