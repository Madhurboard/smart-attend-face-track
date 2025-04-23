
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Settings, Database, Save, Trash, RefreshCw, FileText, Code } from "lucide-react";

const Developer = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Developer Settings</h2>
        <p className="text-muted-foreground">Advanced configuration options for the system</p>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="detection">Face Detection</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Configure general application parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" defaultValue="SmartAttend" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input id="institution" defaultValue="Demo University" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable additional logging and debug information
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Developer Console</Label>
                    <p className="text-sm text-muted-foreground">
                      Show developer console in the UI
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically check for and apply updates
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => toast.success('Settings saved successfully')}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="detection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Face Detection Configuration</CardTitle>
              <CardDescription>Fine-tune the face detection parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="detection-algorithm">Detection Algorithm</Label>
                  <Select defaultValue="lbph">
                    <SelectTrigger id="detection-algorithm">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbph">Local Binary Pattern Histograms (LBPH)</SelectItem>
                      <SelectItem value="eigenfaces">Eigenfaces</SelectItem>
                      <SelectItem value="fisherfaces">Fisherfaces</SelectItem>
                      <SelectItem value="dnn">Deep Neural Network</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confidence-threshold">Confidence Threshold (%)</Label>
                  <Input id="confidence-threshold" type="number" defaultValue="85" />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="min-neighbors">Minimum Neighbors</Label>
                  <Input id="min-neighbors" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scale-factor">Scale Factor</Label>
                  <Input id="scale-factor" type="number" step="0.05" defaultValue="1.3" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Face Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Track faces across frames for improved detection
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Anti-Spoofing</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable detection of printed photos or digital screens
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Store Face Recognition Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Save processed face data for future analysis
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => toast.info('Detection settings reset to defaults')}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button onClick={() => toast.success('Detection settings saved successfully')}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>Configure and manage database settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="db-type">Database Type</Label>
                    <Select defaultValue="mysql">
                      <SelectTrigger id="db-type">
                        <SelectValue placeholder="Select database type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="sqlite">SQLite</SelectItem>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Host</Label>
                    <Input id="db-host" defaultValue="localhost" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Database Name</Label>
                    <Input id="db-name" defaultValue="attendance_system" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-user">Username</Label>
                    <Input id="db-user" defaultValue="admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-password">Password</Label>
                    <Input id="db-password" type="password" defaultValue="********" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto Backup</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup database at regular intervals
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Export Excel Format</Label>
                    <p className="text-sm text-muted-foreground">
                      Export reports in Excel (.xlsx) format instead of CSV
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="space-y-2 bg-muted/50 p-4 rounded-lg border border-muted">
                <div className="flex items-start space-x-2">
                  <Database className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Database Information</h4>
                    <p className="text-sm text-muted-foreground">MySQL 8.0.26 | Size: 24.6 MB | Tables: 15 | Records: 895</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10" onClick={() => toast.error('Database reset action canceled')}>
                <Trash className="mr-2 h-4 w-4" />
                Reset Database
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => toast.success('Database backup created successfully')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Backup Now
                </Button>
                <Button onClick={() => toast.success('Database settings saved successfully')}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>View and manage system event logs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg overflow-auto h-72">
                <pre>
                  {`[2025-04-23 08:30:15] INFO: System initialized successfully
[2025-04-23 08:30:16] INFO: Database connection established
[2025-04-23 08:30:17] INFO: Face recognition model loaded
[2025-04-23 08:45:23] INFO: Admin user 'admin' logged in
[2025-04-23 09:15:42] INFO: Started attendance session
[2025-04-23 09:16:05] INFO: Student 'John Smith' (S001) detected with confidence 92%
[2025-04-23 09:16:32] INFO: Student 'Emma Williams' (S002) detected with confidence 89%
[2025-04-23 09:17:15] INFO: Student 'Michael Brown' (S003) detected with confidence 96%
[2025-04-23 09:45:18] INFO: Ended attendance session
[2025-04-23 10:12:55] INFO: Attendance report exported for date: 2025-04-23
[2025-04-23 11:05:10] WARNING: Low memory warning - 85% usage
[2025-04-23 11:30:22] INFO: Background auto-backup process started
[2025-04-23 11:32:45] INFO: Database backup completed successfully
[2025-04-23 13:15:08] ERROR: Failed to connect to camera - Device busy
[2025-04-23 13:15:12] INFO: Camera connection retry successful
[2025-04-23 14:22:30] INFO: Student record updated for 'Emma Williams' (S002)
[2025-04-23 15:10:17] INFO: Face training process initiated
[2025-04-23 15:12:45] INFO: Model training completed with 98.2% accuracy
[2025-04-23 16:45:12] INFO: System configuration saved`}
                </pre>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => toast.success('Log file exported successfully')}>Export Logs</Button>
                  <Button variant="outline" onClick={() => toast.info('Log file cleared')}>Clear Logs</Button>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Log level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Developer;
