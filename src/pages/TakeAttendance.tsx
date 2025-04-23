
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Camera, Check, X, FileText, Download } from "lucide-react";

interface DetectedStudent {
  id: string;
  name: string;
  rollNo: string;
  course: string;
  time: string;
  confidence: number;
}

const TakeAttendance = () => {
  const [isActive, setIsActive] = useState(false);
  const [detectedStudents, setDetectedStudents] = useState<DetectedStudent[]>([]);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }));
  
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  // Simulated mock data for detected students
  const mockStudents = [
    { id: '1', name: 'John Smith', rollNo: 'S001', course: 'Computer Science', confidence: 92 },
    { id: '2', name: 'Emma Williams', rollNo: 'S002', course: 'Information Technology', confidence: 89 },
    { id: '3', name: 'Michael Brown', rollNo: 'S003', course: 'Electronics', confidence: 96 },
  ];
  
  useEffect(() => {
    let detectionInterval: NodeJS.Timeout;
    
    if (isActive) {
      // Simulate student detection at random intervals
      detectionInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * mockStudents.length);
        const student = mockStudents[randomIndex];
        
        // Check if student is already detected
        if (!detectedStudents.some(s => s.id === student.id)) {
          const detectedTime = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });
          
          const newDetectedStudent = {
            ...student,
            time: detectedTime,
          };
          
          setDetectedStudents(prev => [...prev, newDetectedStudent]);
          toast.success(`${student.name} marked present`);
        }
        
        // Stop after all mock students are detected
        if (detectedStudents.length >= mockStudents.length - 1) {
          clearInterval(detectionInterval);
        }
      }, 5000);
    }
    
    return () => clearInterval(detectionInterval);
  }, [isActive, detectedStudents]);

  const toggleAttendanceSession = () => {
    if (!isActive) {
      setIsActive(true);
      toast.info('Attendance session started');
    } else {
      setIsActive(false);
      toast.info('Attendance session ended');
    }
  };

  const clearAttendance = () => {
    setDetectedStudents([]);
    toast.info('Attendance data cleared');
  };

  const exportAttendance = () => {
    toast.success('Attendance report exported');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Live Attendance</h2>
          <p className="text-muted-foreground">{currentDate} | {currentTime}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant={isActive ? "destructive" : "default"} onClick={toggleAttendanceSession}>
            {isActive ? (
              <>
                <X className="mr-2 h-4 w-4" />
                End Session
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Start Session
              </>
            )}
          </Button>
          <Button variant="outline" onClick={clearAttendance}>
            Clear
          </Button>
          <Button variant="outline" onClick={exportAttendance} disabled={detectedStudents.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Camera Feed</CardTitle>
              <CardDescription>Real-time face detection</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="video-container">
                <div className="flex items-center justify-center h-full bg-gray-900 relative">
                  {isActive ? (
                    <>
                      <div className="absolute top-4 right-4 flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-1"></div>
                        <span className="text-white text-xs">LIVE</span>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Camera processing active...</p>
                        <div className="mt-4 space-x-2">
                          {detectedStudents.length > 0 && (
                            <div className="inline-block px-2 py-1 bg-green-600/70 text-white text-xs rounded">
                              {detectedStudents.length} detected
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-400">Camera inactive</p>
                      <p className="text-xs text-gray-500 mt-2">Click "Start Session" to begin</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-muted/50 p-3 text-sm">
              <div>Status: {isActive ? 'Active' : 'Inactive'}</div>
              <div>Session: {detectedStudents.length} present</div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Students:</span>
                  <span className="font-medium">145</span>
                </div>
                <div className="flex justify-between">
                  <span>Present:</span>
                  <span className="font-medium text-green-600">{detectedStudents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Absent:</span>
                  <span className="font-medium text-red-600">{145 - detectedStudents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Attendance Rate:</span>
                  <span className="font-medium">
                    {detectedStudents.length > 0
                      ? ((detectedStudents.length / 145) * 100).toFixed(1) + '%'
                      : '0.0%'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Attendance Log</CardTitle>
                <CardDescription>Students marked present</CardDescription>
              </div>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detectedStudents.length > 0 ? (
                    detectedStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.rollNo}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.time}</TableCell>
                        <TableCell className="text-right">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            Present
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        {isActive ? 'Waiting for students to be detected...' : 'Start a session to record attendance'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="bg-muted/30 py-3">
              <div className="w-full text-sm text-muted-foreground">
                {detectedStudents.length > 0 ? `Updated ${new Date().toLocaleTimeString()}` : 'No records yet'}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendance;
