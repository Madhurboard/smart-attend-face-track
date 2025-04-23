
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Camera, Database } from "lucide-react";

const TrainFaces = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trained, setTrained] = useState(false);
  
  const startTraining = () => {
    setIsTraining(true);
    setProgress(0);
    setTrained(false);
    
    // Simulate training process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setTrained(true);
          toast.success("Face training completed successfully!");
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  return (
    <div className="flex flex-col space-y-8 items-center max-w-3xl mx-auto animate-fade-in">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Camera className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center">Train Face Recognition Model</CardTitle>
          <CardDescription className="text-center">
            This process will train the face recognition system using the captured student photos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted rounded-lg p-6">
            <h3 className="font-medium mb-2">Before training:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Ensure all students have at least 5 photo samples for best results</li>
              <li>Captured photos should have good lighting and clear face visibility</li>
              <li>Training may take several minutes depending on the number of students</li>
              <li>Do not close the application during the training process</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Training Status</span>
              <span>{isTraining ? 'In Progress' : trained ? 'Completed' : 'Not Started'}</span>
            </div>
            <Progress value={progress} className="h-2" />
            {isTraining && (
              <p className="text-sm text-muted-foreground">Processing {progress}% complete...</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <Card className="p-4">
              <h3 className="font-medium">Students</h3>
              <p className="text-3xl font-bold text-primary mt-2">145</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-medium">Photos</h3>
              <p className="text-3xl font-bold text-primary mt-2">652</p>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            disabled={isTraining} 
            onClick={startTraining}
          >
            {isTraining ? 'Training in Progress...' : trained ? 'Retrain Model' : 'Start Training'}
          </Button>
        </CardFooter>
      </Card>
      
      {trained && (
        <Card className="w-full border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Training Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Model Accuracy</p>
                  <p className="text-2xl font-bold">98.2%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Training Time</p>
                  <p className="text-2xl font-bold">6:24</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Model Information</p>
                <div className="bg-white p-3 rounded-md text-xs font-mono mt-1 border">
                  <p>Model Version: LBPH_v2.1</p>
                  <p>Features: 145 students / 652 images</p>
                  <p>Created: {new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainFaces;
