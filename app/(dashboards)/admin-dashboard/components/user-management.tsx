"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  PlusCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  UserCog,
  UserX,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal";
import { useSession } from "next-auth/react";

import { CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

import Link from "next/link";
import BrainLoading from "@/app/components/brain-loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const axiosNormal = UseAxiosNormal();
  const [modalUserData, setModalUserData] = useState({});
  const [open, setOpen] = useState(false);

  const {
    data: usersData = [],
    refetch: refetchStats,
    isLoading: adminStateLoading,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosNormal.get("/admin/stats");
      setUsers(res.data.users);
      return res.data.users; // only return 'users' from the response
    },
  });

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.userStatus === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Toggle user selection
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((_id) => _id !== userId)
        : [...prev, userId]
    );
  };

  // Toggle all users selection
  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user._id));
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // get user for modal

  // Edit user information
  const openModal = async (email: string) => {
    setOpen(!open);
    const res = await axiosNormal.get(`/signin/${email}`);
    setModalUserData(res.data.userInfo);
    console.log("user data", res.data);
  };

  // Update user information
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: any) => {
      const res = await axiosNormal.patch(
        `/user/update/profile/${updatedUser._id}`,
        updatedUser
      );
      console.log("update user", res.data);
      if (res.data.status && res.data.result.modifiedCount > 0) {
        refetchStats();
        toast.success(res.data.message);
      } else if (!res.data.status) {
        toast.error(res.data.message);
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-stats"]);
      setOpen(false); // Close the modal after successful update
    },
  });

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedUser = {
      _id: modalUserData._id,
      username: formData.get("username"),
      phone: formData.get("phone"),
    };

    updateUserMutation.mutate(updatedUser);
    console.log("user data", modalUserData);
  };

  // Delete user
  const deleteUser = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",

      // === Styling based on dark mode ===
      background: document.documentElement.classList.contains("dark")
        ? "#0F172A" // dark:bg-[#0F172A]
        : "#FFFFFF", // light mode

      color: document.documentElement.classList.contains("dark")
        ? "#FFFFFF" // dark:text-white
        : "#0F172A", // text-slate-900

      confirmButtonColor: "#7C3AED", // your primary color
      cancelButtonColor: document.documentElement.classList.contains("dark")
        ? "#F87171" // red-400
        : "#DC2626", // red-600
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosNormal.delete(`/user/delete/${userId}`);
        if (res.data.status) {
          Swal.fire({
            title: "Deleted!",
            text: res.data.message,
            icon: "success",
          });
          refetchStats();
        } else {
          Swal.fire({
            title: "Oops!",
            text: res.data.message,
            icon: "error",
          });
        }
      }
    });
  };

  // Change user role
  const changeRole = async (userId: string) => {
    const { value: selectedRole } = await Swal.fire({
      title: "Change Role",
      input: "select",
      inputOptions: {
        admin: "Admin",
        user: "User",
      },
      inputPlaceholder: "Select a role",
      showCancelButton: true,
      confirmButtonText: "Change",
      background: document.documentElement.classList.contains("dark")
        ? "#0F172A"
        : "#FFFFFF",
      color: document.documentElement.classList.contains("dark")
        ? "#FFFFFF"
        : "#0F172A",
      confirmButtonColor: "#7C3AED",
      cancelButtonColor: document.documentElement.classList.contains("dark")
        ? "#F87171"
        : "#DC2626",
    });

    if (selectedRole) {
      try {
        const res = await axiosNormal.patch(`/user/role/change/${userId}`, {
          role: selectedRole,
        });

        if (res.data.status) {
          Swal.fire({
            title: "Success!",
            text: res.data.message,
            icon: "success",
          });
          refetchStats();
        } else {
          Swal.fire({
            title: "Oops!",
            text: res.data.message,
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
        });
      }
    }
  };

  if (adminStateLoading) {
    return <BrainLoading></BrainLoading>;
  }

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 md:w-[300px]"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="h-9 w-[130px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-9 w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">
                  All Users ({users.length})
                </TabsTrigger>
                <TabsTrigger value="online">
                  Online (
                  {users.filter((u) => u.userStatus === "online").length})
                </TabsTrigger>
                <TabsTrigger value="offline">
                  Offline (
                  {users.filter((u) => u.userStatus === "offline").length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]">
                          <Checkbox
                            checked={
                              selectedUsers.length === filteredUsers.length &&
                              filteredUsers.length > 0
                            }
                            onCheckedChange={toggleAllUsers}
                          />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Quizzes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user._id)}
                              onCheckedChange={() =>
                                toggleUserSelection(user._id)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage
                                  src={user.picture}
                                  className="object-cover"
                                  alt={user.username}
                                />
                                <AvatarFallback>
                                  {user.username.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  {user.username}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "admin"
                                  ? "default"
                                  : user.role === "moderator"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="capitalize"
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.userStatus === "online"
                                  ? "default"
                                  : "outline"
                              }
                              className="capitalize"
                            >
                              {user.userStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(user.creationTime)}</TableCell>
                          <TableCell>
                            {formatDate(user.lastLoginTime)}
                          </TableCell>
                          <TableCell>{user.totalQuizzes}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => openModal(user.email)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => changeRole(user._id)}
                                >
                                  <UserCog className="mr-2 h-4 w-4" />
                                  Change Role
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <UserX className="mr-2 h-4 w-4" />
                                  Suspend User
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteUser(user._id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="online">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Quizzes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users
                        .filter((user) => user.userStatus === "online")
                        .map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedUsers.includes(user._id)}
                                onCheckedChange={() =>
                                  toggleUserSelection(user._id)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={user.picture}
                                    alt={user.username}
                                  />
                                  <AvatarFallback>
                                    {user.username.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    {user.username}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  user.role === "admin"
                                    ? "default"
                                    : user.role === "moderator"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="capitalize"
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default" className="capitalize">
                                {user.userStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatDate(user.creationTime)}
                            </TableCell>
                            <TableCell>
                              {formatDate(user.lastLoginTime)}
                            </TableCell>
                            <TableCell>{user.totalQuizzes}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Change Role
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <UserX className="mr-2 h-4 w-4" />
                                    Suspend User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="offline">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Quizzes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users
                        .filter((user) => user.userStatus === "offline")
                        .map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedUsers.includes(user._id)}
                                onCheckedChange={() =>
                                  toggleUserSelection(user._id)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={user.picture}
                                    alt={user.username}
                                  />
                                  <AvatarFallback>
                                    {user.username.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    {user.username}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  user.role === "admin"
                                    ? "default"
                                    : user.role === "moderator"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="capitalize"
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {user.userStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatDate(user.creationTime)}
                            </TableCell>
                            <TableCell>
                              {formatDate(user.lastLoginTime)}
                            </TableCell>
                            <TableCell>{user.totalQuizzes}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Change Role
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <UserX className="mr-2 h-4 w-4" />
                                    Suspend User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {/* User update modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <Card className="w-full">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Edit User Information
                </CardTitle>
                <CardDescription className="text-center">
                  Update the user's information below.
                </CardDescription>
              </CardHeader>

              <form onSubmit={updateUser}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      defaultValue={modalUserData.username}
                      id="username"
                      name="username"
                      placeholder="johndoe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      defaultValue={modalUserData.email}
                      readOnly={true}
                      disabled={true}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      defaultValue={modalUserData.phone}
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <Button type="submit" className="w-full cursor-pointer">
                    Update User
                  </Button>
                </CardContent>
              </form>

              <CardFooter className="flex justify-between items-center cursor-pointer">
                <Button
                  className="bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
                  variant="ghost"
                  onClick={() => setOpen(!open)}
                >
                  Close
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
