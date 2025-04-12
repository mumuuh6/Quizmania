"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Bell, Globe, Lock, Moon, Palette, Save, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function AdminSettings() {
  const [theme, setTheme] = useState("light")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your platform's general settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="Quiz Master" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform-description">Platform Description</Label>
                <Textarea
                  id="platform-description"
                  defaultValue="The ultimate quiz platform for learning and assessment"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="admin@quizmaster.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quiz Settings</CardTitle>
              <CardDescription>Configure default settings for quizzes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-time-limit">Default Time Limit (minutes)</Label>
                <Input id="default-time-limit" type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-passing-score">Default Passing Score (%)</Label>
                <Input id="default-passing-score" type="number" defaultValue="70" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-answers">Show Correct Answers After Quiz</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to see correct answers after completing a quiz
                  </p>
                </div>
                <Switch id="show-answers" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shuffle-questions">Shuffle Questions</Label>
                  <p className="text-sm text-muted-foreground">Randomize the order of questions for each user</p>
                </div>
                <Switch id="shuffle-questions" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-retakes">Allow Quiz Retakes</Label>
                  <p className="text-sm text-muted-foreground">Let users retake quizzes they've already completed</p>
                </div>
                <Switch id="allow-retakes" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the look and feel of your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="flex items-center space-x-2">
                  <RadioGroup defaultValue={theme} onValueChange={setTheme} className="flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center">
                        <Sun className="mr-2 h-4 w-4" />
                        Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center">
                        <Moon className="mr-2 h-4 w-4" />
                        Dark
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  {["slate", "blue", "green", "violet", "pink", "orange"].map((color) => (
                    <div
                      key={color}
                      className={`h-10 w-full rounded-md cursor-pointer border-2 ${
                        color === "blue" ? "border-primary" : "border-transparent"
                      }`}
                      style={{
                        backgroundColor:
                          color === "slate"
                            ? "#64748b"
                            : color === "blue"
                              ? "#3b82f6"
                              : color === "green"
                                ? "#10b981"
                                : color === "violet"
                                  ? "#8b5cf6"
                                  : color === "pink"
                                    ? "#ec4899"
                                    : "#f97316", // orange
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-css">Custom CSS</Label>
                <Textarea id="custom-css" placeholder="Enter custom CSS code" className="font-mono text-sm" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-logo">Show Logo</Label>
                  <p className="text-sm text-muted-foreground">Display your logo in the header</p>
                </div>
                <Switch id="show-logo" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Use a more compact layout with less whitespace</p>
                </div>
                <Switch id="compact-mode" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email notifications sent to users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="welcome-email">Welcome Email</Label>
                  <p className="text-sm text-muted-foreground">Send a welcome email when a new user registers</p>
                </div>
                <Switch id="welcome-email" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="quiz-completion">Quiz Completion</Label>
                  <p className="text-sm text-muted-foreground">Send an email when a user completes a quiz</p>
                </div>
                <Switch id="quiz-completion" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password-reset">Password Reset</Label>
                  <p className="text-sm text-muted-foreground">Send password reset instructions</p>
                </div>
                <Switch id="password-reset" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-quiz">New Quiz Notification</Label>
                  <p className="text-sm text-muted-foreground">Notify users when new quizzes are available</p>
                </div>
                <Switch id="new-quiz" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Send promotional emails and updates</p>
                </div>
                <Switch id="marketing-emails" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="email-sender">Email Sender Name</Label>
                <Input id="email-sender" defaultValue="Quiz Master" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-from">From Email Address</Label>
                <Input id="email-from" type="email" defaultValue="noreply@quizmaster.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Notifications</CardTitle>
              <CardDescription>Configure notifications for administrators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-user-admin">New User Registration</Label>
                  <p className="text-sm text-muted-foreground">Notify admins when a new user registers</p>
                </div>
                <Switch id="new-user-admin" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="user-report">User Reports</Label>
                  <p className="text-sm text-muted-foreground">Notify admins when a user reports content</p>
                </div>
                <Switch id="user-report" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-alerts">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about system issues</p>
                </div>
                <Switch id="system-alerts" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (minimum 8 characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, letters & numbers)</SelectItem>
                    <SelectItem value="strong">Strong (8+ chars, mixed case, numbers & symbols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="account-lockout">Account Lockout</Label>
                  <p className="text-sm text-muted-foreground">Lock accounts after multiple failed login attempts</p>
                </div>
                <Switch id="account-lockout" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="force-ssl">Force SSL</Label>
                  <p className="text-sm text-muted-foreground">Require secure HTTPS connections</p>
                </div>
                <Switch id="force-ssl" defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Login Methods</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email-login" defaultChecked />
                    <Label htmlFor="email-login">Email & Password</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="google-login" defaultChecked />
                    <Label htmlFor="google-login">Google</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="github-login" defaultChecked />
                    <Label htmlFor="github-login">GitHub</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="twitter-login" />
                    <Label htmlFor="twitter-login">Twitter</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
              <CardDescription>Configure data protection and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                <Input id="data-retention" type="number" defaultValue="365" />
                <p className="text-sm text-muted-foreground">
                  How long to keep user data after account deletion (0 for immediate deletion)
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cookie-consent">Cookie Consent Banner</Label>
                  <p className="text-sm text-muted-foreground">Show a cookie consent banner to users</p>
                </div>
                <Switch id="cookie-consent" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="privacy-policy">Privacy Policy</Label>
                  <p className="text-sm text-muted-foreground">Require users to accept privacy policy</p>
                </div>
                <Switch id="privacy-policy" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-export">User Data Export</Label>
                  <p className="text-sm text-muted-foreground">Allow users to export their data</p>
                </div>
                <Switch id="data-export" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
