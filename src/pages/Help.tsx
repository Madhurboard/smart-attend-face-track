
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { HelpCircle, FileText, Video, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Help = () => {
  const faqs = [
    {
      question: "How does facial recognition attendance work?",
      answer: "The system uses computer vision algorithms to detect and recognize faces. When a student stands in front of the camera, their face is detected and compared against stored face samples. If a match is found, their attendance is automatically recorded."
    },
    {
      question: "How many photo samples are required per student?",
      answer: "For optimal recognition accuracy, we recommend capturing at least 5 photo samples per student. These samples should ideally be taken in different lighting conditions and angles to improve recognition reliability."
    },
    {
      question: "What should I do if a student's face is not being recognized?",
      answer: "If a student's face is not being recognized, try recapturing their photo samples in good lighting conditions. Make sure their face is clearly visible and not obscured by hair, glasses, or masks. You can also try adjusting the confidence threshold in the developer settings."
    },
    {
      question: "How often should I train the recognition model?",
      answer: "The recognition model should be retrained whenever new students are added or if there are significant changes to existing students (such as change in appearance). As a general practice, retraining the model once every semester is recommended."
    },
    {
      question: "Can the system detect if someone is trying to fool it with a photo?",
      answer: "Yes, the system includes an anti-spoofing feature that can be enabled in the developer settings. This helps detect attempts to fool the system using printed photos or digital screens, although it's not 100% foolproof."
    },
    {
      question: "How can I export attendance reports?",
      answer: "You can export attendance reports from the Reports section. Select the desired date range and report type, then click the Export button. Reports can be exported in Excel or CSV format depending on your configuration."
    },
    {
      question: "Is there a limit to how many students the system can handle?",
      answer: "The system is designed to handle up to 1000 students efficiently. Beyond that, you might notice some performance degradation depending on your hardware specifications."
    }
  ];

  const documentation = [
    { title: "User Guide", icon: <FileText className="h-4 w-4" />, action: () => toast.info("Downloading User Guide PDF...") },
    { title: "Video Tutorials", icon: <Video className="h-4 w-4" />, action: () => toast.info("Opening Video Tutorials...") },
    { title: "API Documentation", icon: <FileText className="h-4 w-4" />, action: () => toast.info("Opening API Documentation...") },
  ];

  const support = [
    { title: "Email Support", icon: <Mail className="h-4 w-4" />, action: () => toast.info("Opening email client...") },
    { title: "Live Chat", icon: <MessageSquare className="h-4 w-4" />, action: () => toast.info("Connecting to live chat...") },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Help & Support</h2>
        <p className="text-muted-foreground">Find answers, documentation, and contact support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <CardTitle>Frequently Asked Questions</CardTitle>
            </div>
            <CardDescription>Common questions and answers about the attendance system</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Guides and reference materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {documentation.map((doc, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={doc.action}
                >
                  {doc.icon}
                  <span className="ml-2">{doc.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {support.map((item, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={item.action}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Button>
              ))}
            </CardContent>
            <CardFooter className="flex-col items-start border-t pt-6 mt-2">
              <p className="text-sm font-medium">Support Hours</p>
              <p className="text-sm text-muted-foreground">Monday to Friday, 9AM to 5PM</p>
              <p className="text-sm text-muted-foreground">support@smartattend.example</p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="bg-muted/50 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              If you couldn't find what you're looking for in our documentation or FAQs, our support team is ready to assist you.
            </p>
            <Button onClick={() => toast.success("Creating support ticket...")}>Create Support Ticket</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
