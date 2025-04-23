
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Download, FileText, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for attendance reports
const mockAttendanceData = {
  daily: [
    { id: 1, date: '2025-04-22', present: 112, absent: 33, percentage: 77.2 },
    { id: 2, date: '2025-04-21', present: 105, absent: 40, percentage: 72.4 },
    { id: 3, date: '2025-04-20', present: 118, absent: 27, percentage: 81.4 },
    { id: 4, date: '2025-04-19', present: 98, absent: 47, percentage: 67.6 },
    { id: 5, date: '2025-04-18', present: 110, absent: 35, percentage: 75.9 },
    { id: 6, date: '2025-04-17', present: 107, absent: 38, percentage: 73.8 },
    { id: 7, date: '2025-04-16', present: 115, absent: 30, percentage: 79.3 },
  ],
  monthly: [
    { id: 1, month: 'April 2025', present: 2345, totalSessions: 16, avgPercentage: 76.8 },
    { id: 2, month: 'March 2025', present: 2876, totalSessions: 22, avgPercentage: 81.2 },
    { id: 3, month: 'February 2025', present: 2455, totalSessions: 19, avgPercentage: 78.9 },
  ],
  students: [
    { id: 1, name: 'John Smith', rollNo: 'S001', totalPresent: 16, totalSessions: 20, percentage: 80.0 },
    { id: 2, name: 'Emma Williams', rollNo: 'S002', totalPresent: 19, totalSessions: 20, percentage: 95.0 },
    { id: 3, name: 'Michael Brown', rollNo: 'S003', totalPresent: 14, totalSessions: 20, percentage: 70.0 },
    { id: 4, name: 'Olivia Jones', rollNo: 'S004', totalPresent: 18, totalSessions: 20, percentage: 90.0 },
    { id: 5, name: 'William Davis', rollNo: 'S005', totalPresent: 17, totalSessions: 20, percentage: 85.0 },
    { id: 6, name: 'Sophia Miller', rollNo: 'S006', totalPresent: 15, totalSessions: 20, percentage: 75.0 },
    { id: 7, name: 'James Wilson', rollNo: 'S007', totalPresent: 20, totalSessions: 20, percentage: 100.0 },
  ]
};

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  const handleExport = (reportType: string) => {
    toast.success(`${reportType} report exported to Excel`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Attendance Reports</h2>
          <p className="text-muted-foreground">View and export attendance records</p>
        </div>
        
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="it">Information Technology</SelectItem>
              <SelectItem value="elec">Electronics</SelectItem>
              <SelectItem value="mech">Mechanical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Reports</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Reports</TabsTrigger>
          <TabsTrigger value="students">Student-wise</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Daily Attendance Reports</CardTitle>
                <CardDescription>Daily attendance summary for all students</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleExport('Daily')}>
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Attendance %</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAttendanceData.daily.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>{record.present}</TableCell>
                      <TableCell>{record.absent}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.percentage >= 80 ? 'bg-green-100 text-green-800' :
                          record.percentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {record.percentage}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.info(`Viewing details for ${record.date}`)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Monthly Attendance Reports</CardTitle>
                <CardDescription>Monthly attendance summary for all students</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleExport('Monthly')}>
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Total Present</TableHead>
                    <TableHead>Total Sessions</TableHead>
                    <TableHead>Average Attendance %</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAttendanceData.monthly.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.month}</TableCell>
                      <TableCell>{record.present}</TableCell>
                      <TableCell>{record.totalSessions}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.avgPercentage >= 80 ? 'bg-green-100 text-green-800' :
                          record.avgPercentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {record.avgPercentage}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.info(`Viewing details for ${record.month}`)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Student-wise Attendance Reports</CardTitle>
                <CardDescription>Attendance breakdown by student</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleExport('Student-wise')}>
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Present Days</TableHead>
                    <TableHead>Total Sessions</TableHead>
                    <TableHead>Attendance %</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAttendanceData.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.totalPresent}</TableCell>
                      <TableCell>{student.totalSessions}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.percentage >= 80 ? 'bg-green-100 text-green-800' :
                          student.percentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.percentage}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.info(`Viewing details for ${student.name}`)}
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
