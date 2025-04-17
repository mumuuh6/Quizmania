import { AdminHeader } from "../components/admin-header";
import AdminShell from "../components/admin-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function PermissionsPage() {
  return (
    <AdminShell>
      <AdminHeader
        heading="Permissions"
        text="Manage user roles and access permissions."></AdminHeader>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>
              Configure what each user role can access and modify
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Permission</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Moderator</TableHead>
                  <TableHead>User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">View Dashboard</TableCell>
                  <TableCell>
                    <Switch defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Switch disabled />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Manage Users</TableCell>
                  <TableCell>
                    <Switch defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                  <TableCell>
                    <Switch disabled />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Create Quizzes</TableCell>
                  <TableCell>
                    <Switch defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Edit Any Quiz</TableCell>
                  <TableCell>
                    <Switch defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                  <TableCell>
                    <Switch disabled />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Delete Quizzes</TableCell>
                  <TableCell>
                    <Switch defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                  <TableCell>
                    <Switch disabled />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">View Reports</TableCell>
                  <TableCell>
                    <Switch defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                  <TableCell>
                    <Switch disabled />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Manage Settings</TableCell>
                  <TableCell>
                    <Switch defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Switch disabled />
                  </TableCell>
                  <TableCell>
                    <Switch disabled />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Manage Permissions
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Switch disabled />
                  </TableCell>
                  <TableCell>
                    <Switch disabled />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>Current user role assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>john.doe@example.com</TableCell>
                  <TableCell>
                    <Badge variant="default">Admin</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sarah Johnson</TableCell>
                  <TableCell>sarah.j@example.com</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Moderator</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jennifer Lee</TableCell>
                  <TableCell>jennifer.l@example.com</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Moderator</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Michael Brown</TableCell>
                  <TableCell>michael.b@example.com</TableCell>
                  <TableCell>
                    <Badge variant="outline">User</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Pending
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Emily Wilson</TableCell>
                  <TableCell>emily.w@example.com</TableCell>
                  <TableCell>
                    <Badge variant="outline">User</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
