import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const Webinars = () => {
  const [currentMonth, setCurrentMonth] = useState(0);

  const months = [
    "October 2025",
    "November 2025",
    "December 2025",
    "January 2026",
    "February 2026",
    "March 2026",
  ];

  const channels = [
    { id: 1, name: "Academic Topics", color: "bg-primary" },
    { id: 2, name: "Vendor Solution Presentations", color: "bg-secondary" },
    { id: 3, name: "General Webinars", color: "bg-accent-foreground" },
  ];

  // Sample webinars data
  const webinars = {
    "October 2025": [
      { channel: 1, title: "Cloud Security Fundamentals", date: "Oct 15, 2PM-3PM EDT", speaker: "Dr. James Smith, MIT" },
      { channel: 2, title: "Microsoft Azure Government Solutions", date: "Oct 15, 3PM-4PM EDT", speaker: "Sarah Johnson, Microsoft" },
      { channel: 3, title: "Digital Transformation Roadmap", date: "Oct 16, 11AM-12PM EDT", speaker: "WRITA Leadership" },
      { channel: 1, title: "Data Analytics in Public Sector", date: "Oct 22, 2PM-3PM EDT", speaker: "Prof. Maria Garcia, Stanford" },
      { channel: 2, title: "ServiceNow for Government", date: "Oct 23, 1PM-2PM EDT", speaker: "Tom Wilson, ServiceNow" },
      { channel: 3, title: "Cybersecurity Best Practices", date: "Oct 29, 10AM-11AM EDT", speaker: "Security Panel" },
    ],
    "November 2025": [
      { channel: 1, title: "AI & Machine Learning Basics", date: "Nov 5, 2PM-3PM EST", speaker: "Dr. Lisa Chen, Berkeley" },
      { channel: 2, title: "AWS GovCloud Deep Dive", date: "Nov 6, 3PM-4PM EST", speaker: "Mike Roberts, AWS" },
      { channel: 3, title: "Remote Work Infrastructure", date: "Nov 12, 11AM-12PM EST", speaker: "IT Leaders Roundtable" },
      { channel: 1, title: "Blockchain in Government", date: "Nov 19, 2PM-3PM EST", speaker: "Prof. David Lee, Harvard" },
      { channel: 2, title: "Salesforce Government Cloud", date: "Nov 20, 1PM-2PM EST", speaker: "Jennifer Martinez, Salesforce" },
      { channel: 3, title: "Budget Planning for IT", date: "Nov 26, 10AM-11AM EST", speaker: "Finance Committee" },
    ],
    "December 2025": [
      { channel: 1, title: "Privacy & Data Protection", date: "Dec 3, 2PM-3PM EST", speaker: "Dr. Emily White, Georgetown" },
      { channel: 2, title: "Google Workspace for Gov", date: "Dec 4, 3PM-4PM EST", speaker: "Alex Brown, Google" },
      { channel: 3, title: "Year in Review: IT Trends", date: "Dec 10, 11AM-12PM EST", speaker: "WRITA Team" },
      { channel: 1, title: "Open Source Technologies", date: "Dec 17, 2PM-3PM EST", speaker: "Prof. Robert Kim, MIT" },
    ],
    "January 2026": [
      { channel: 1, title: "Digital Identity Management", date: "Jan 7, 2PM-3PM EST", speaker: "Dr. Amanda Taylor, Yale" },
      { channel: 2, title: "Oracle Cloud Infrastructure", date: "Jan 8, 3PM-4PM EST", speaker: "Chris Anderson, Oracle" },
      { channel: 3, title: "New Year Planning Session", date: "Jan 14, 11AM-12PM EST", speaker: "Leadership Panel" },
      { channel: 1, title: "IoT in Smart Cities", date: "Jan 21, 2PM-3PM EST", speaker: "Prof. Kevin Park, Stanford" },
      { channel: 2, title: "VMware Government Solutions", date: "Jan 22, 1PM-2PM EST", speaker: "Susan Lee, VMware" },
      { channel: 3, title: "Citizen Engagement Platforms", date: "Jan 28, 10AM-11AM EST", speaker: "Community Leaders" },
    ],
    "February 2026": [
      { channel: 1, title: "Quantum Computing Intro", date: "Feb 4, 2PM-3PM EST", speaker: "Dr. Michael Zhang, Caltech" },
      { channel: 2, title: "Dell Technologies for Gov", date: "Feb 5, 3PM-4PM EST", speaker: "Patricia Rodriguez, Dell" },
      { channel: 3, title: "Conference Preview & Prep", date: "Feb 11, 11AM-12PM EST", speaker: "Conference Committee" },
      { channel: 1, title: "5G Network Implementation", date: "Feb 18, 2PM-3PM EST", speaker: "Prof. Nancy Wilson, MIT" },
      { channel: 2, title: "Cisco Networking Solutions", date: "Feb 19, 1PM-2PM EST", speaker: "Mark Thompson, Cisco" },
    ],
    "March 2026": [
      { channel: 1, title: "Ethical AI in Government", date: "Mar 4, 2PM-3PM EST", speaker: "Dr. Rachel Green, Harvard" },
      { channel: 2, title: "IBM Cloud Solutions", date: "Mar 5, 3PM-4PM EST", speaker: "James Carter, IBM" },
      { channel: 3, title: "Pre-Conference Networking", date: "Mar 11, 11AM-12PM EDT", speaker: "WRITA Team" },
      { channel: 1, title: "Disaster Recovery Planning", date: "Mar 18, 2PM-3PM EDT", speaker: "Prof. Steven Harris, Stanford" },
      { channel: 2, title: "Red Hat Enterprise Linux", date: "Mar 19, 1PM-2PM EDT", speaker: "Laura Martinez, Red Hat" },
      { channel: 3, title: "Final Conference Details", date: "Mar 25, 10AM-11AM EDT", speaker: "Conference Team" },
    ],
  };

  const currentMonthName = months[currentMonth];
  const currentWebinars = webinars[currentMonthName] || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Webinar Schedule</h1>
          <p className="text-xl text-primary-foreground/90">
            Browse upcoming webinars across all channels
          </p>
        </div>
      </section>

      {/* Channel Guide */}
      <section className="container mx-auto px-4 py-8">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
            disabled={currentMonth === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">{currentMonthName}</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(Math.min(months.length - 1, currentMonth + 1))}
            disabled={currentMonth === months.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Channel Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {channels.map((channel) => (
            <div key={channel.id} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded ${channel.color}`}></div>
              <span className="font-medium text-sm">{channel.name}</span>
            </div>
          ))}
        </div>

        {/* Webinar Grid */}
        <div className="space-y-3">
          {channels.map((channel) => (
            <div key={channel.id}>
              <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
                {channel.name}
              </h3>
              <div className="grid gap-3 mb-6">
                {currentWebinars
                  .filter((w) => w.channel === channel.id)
                  .map((webinar, idx) => (
                    <Card
                      key={idx}
                      className={`border-l-4 hover:shadow-md transition-all cursor-pointer`}
                      style={{ borderLeftColor: channel.color.replace('bg-', 'hsl(var(--') + '))' }}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1 text-foreground hover:text-primary transition-colors">
                              {webinar.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {webinar.speaker}
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                              <Clock className="h-3 w-3" />
                              <span className="text-muted-foreground">{webinar.date}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            Register
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Month Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {months.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentMonth(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentMonth ? "bg-primary w-8" : "bg-muted hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Webinars;
