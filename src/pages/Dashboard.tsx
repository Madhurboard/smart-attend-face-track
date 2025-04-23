
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Camera, Calendar, FileText, Settings, HelpCircle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { id: 1, title: 'Students', value: '145', color: 'bg-blue-100 text-blue-600' },
    { id: 2, title: 'Present Today', value: '112', color: 'bg-green-100 text-green-600' },
    { id: 3, title: 'Absent Today', value: '33', color: 'bg-red-100 text-red-600' },
    { id: 4, title: 'Attendance Rate', value: '77.2%', color: 'bg-purple-100 text-purple-600' },
  ];
  
  const features = [
    { 
      title: 'Student Management', 
      description: 'Add, update, and manage student records',
      icon: <Users className="h-6 w-6" />,
      link: '/students'
    },
    { 
      title: 'Train Photo Samples', 
      description: 'Train the system with student photos',
      icon: <Camera className="h-6 w-6" />, 
      link: '/train'
    },
    { 
      title: 'Take Attendance', 
      description: 'Mark attendance using face recognition',
      icon: <Calendar className="h-6 w-6" />,
      link: '/attendance'
    },
    { 
      title: 'Attendance Reports', 
      description: 'View and export attendance data',
      icon: <FileText className="h-6 w-6" />,
      link: '/reports'
    },
    { 
      title: 'Developer Settings', 
      description: 'Configure system parameters',
      icon: <Settings className="h-6 w-6" />,
      link: '/developer'
    },
    { 
      title: 'Help Desk', 
      description: 'Get support and documentation',
      icon: <HelpCircle className="h-6 w-6" />,
      link: '/help'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader className={`${stat.color} rounded-t-lg p-4`}>
              <CardTitle className="text-lg">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8">Features</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-2 rounded-full bg-primary/10 w-fit">
                {feature.icon}
              </div>
              <CardTitle className="mt-3">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to={feature.link} className="w-full">
                <Button className="w-full">Access</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
