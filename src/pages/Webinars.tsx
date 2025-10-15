import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";

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

  // Sample webinars data with ISO dates
  const webinars = [
    { channel: 1, title: "Cloud Security Fundamentals", date: "2025-10-15", time: "2PM-3PM EDT", speaker: "Dr. James Smith, MIT" },
    { channel: 2, title: "Microsoft Azure Government Solutions", date: "2025-10-15", time: "3PM-4PM EDT", speaker: "Sarah Johnson, Microsoft" },
    { channel: 3, title: "Digital Transformation Roadmap", date: "2025-10-16", time: "11AM-12PM EDT", speaker: "WRITA Leadership" },
    { channel: 1, title: "Data Analytics in Public Sector", date: "2025-10-22", time: "2PM-3PM EDT", speaker: "Prof. Maria Garcia, Stanford" },
    { channel: 2, title: "ServiceNow for Government", date: "2025-10-23", time: "1PM-2PM EDT", speaker: "Tom Wilson, ServiceNow" },
    { channel: 3, title: "Cybersecurity Best Practices", date: "2025-10-29", time: "10AM-11AM EDT", speaker: "Security Panel" },
    
    { channel: 1, title: "AI & Machine Learning Basics", date: "2025-11-05", time: "2PM-3PM EST", speaker: "Dr. Lisa Chen, Berkeley" },
    { channel: 2, title: "AWS GovCloud Deep Dive", date: "2025-11-06", time: "3PM-4PM EST", speaker: "Mike Roberts, AWS" },
    { channel: 3, title: "Remote Work Infrastructure", date: "2025-11-12", time: "11AM-12PM EST", speaker: "IT Leaders Roundtable" },
    { channel: 1, title: "Blockchain in Government", date: "2025-11-19", time: "2PM-3PM EST", speaker: "Prof. David Lee, Harvard" },
    { channel: 2, title: "Salesforce Government Cloud", date: "2025-11-20", time: "1PM-2PM EST", speaker: "Jennifer Martinez, Salesforce" },
    { channel: 3, title: "Budget Planning for IT", date: "2025-11-26", time: "10AM-11AM EST", speaker: "Finance Committee" },
    
    { channel: 1, title: "Privacy & Data Protection", date: "2025-12-03", time: "2PM-3PM EST", speaker: "Dr. Emily White, Georgetown" },
    { channel: 2, title: "Google Workspace for Gov", date: "2025-12-04", time: "3PM-4PM EST", speaker: "Alex Brown, Google" },
    { channel: 3, title: "Year in Review: IT Trends", date: "2025-12-10", time: "11AM-12PM EST", speaker: "WRITA Team" },
    { channel: 1, title: "Open Source Technologies", date: "2025-12-17", time: "2PM-3PM EST", speaker: "Prof. Robert Kim, MIT" },
    
    { channel: 1, title: "Digital Identity Management", date: "2026-01-07", time: "2PM-3PM EST", speaker: "Dr. Amanda Taylor, Yale" },
    { channel: 2, title: "Oracle Cloud Infrastructure", date: "2026-01-08", time: "3PM-4PM EST", speaker: "Chris Anderson, Oracle" },
    { channel: 3, title: "New Year Planning Session", date: "2026-01-14", time: "11AM-12PM EST", speaker: "Leadership Panel" },
    { channel: 1, title: "IoT in Smart Cities", date: "2026-01-21", time: "2PM-3PM EST", speaker: "Prof. Kevin Park, Stanford" },
    { channel: 2, title: "VMware Government Solutions", date: "2026-01-22", time: "1PM-2PM EST", speaker: "Susan Lee, VMware" },
    { channel: 3, title: "Citizen Engagement Platforms", date: "2026-01-28", time: "10AM-11AM EST", speaker: "Community Leaders" },
    
    { channel: 1, title: "Quantum Computing Intro", date: "2026-02-04", time: "2PM-3PM EST", speaker: "Dr. Michael Zhang, Caltech" },
    { channel: 2, title: "Dell Technologies for Gov", date: "2026-02-05", time: "3PM-4PM EST", speaker: "Patricia Rodriguez, Dell" },
    { channel: 3, title: "Conference Preview & Prep", date: "2026-02-11", time: "11AM-12PM EST", speaker: "Conference Committee" },
    { channel: 1, title: "5G Network Implementation", date: "2026-02-18", time: "2PM-3PM EST", speaker: "Prof. Nancy Wilson, MIT" },
    { channel: 2, title: "Cisco Networking Solutions", date: "2026-02-19", time: "1PM-2PM EST", speaker: "Mark Thompson, Cisco" },
    
    { channel: 1, title: "Ethical AI in Government", date: "2026-03-04", time: "2PM-3PM EST", speaker: "Dr. Rachel Green, Harvard" },
    { channel: 2, title: "IBM Cloud Solutions", date: "2026-03-05", time: "3PM-4PM EST", speaker: "James Carter, IBM" },
    { channel: 3, title: "Pre-Conference Networking", date: "2026-03-11", time: "11AM-12PM EDT", speaker: "WRITA Team" },
    { channel: 1, title: "Disaster Recovery Planning", date: "2026-03-18", time: "2PM-3PM EDT", speaker: "Prof. Steven Harris, Stanford" },
    { channel: 2, title: "Red Hat Enterprise Linux", date: "2026-03-19", time: "1PM-2PM EDT", speaker: "Laura Martinez, Red Hat" },
    { channel: 3, title: "Final Conference Details", date: "2026-03-25", time: "10AM-11AM EDT", speaker: "Conference Team" },
  ];

  // Get unique dates and sort them
  const allDates = [...new Set(webinars.map(w => w.date))].sort();
  const startIdx = currentMonth * 10;
  const visibleDates = allDates.slice(startIdx, startIdx + 10);

  const getWebinarForChannelAndDate = (channelId: number, date: string) => {
    return webinars.find(w => w.channel === channelId && w.date === date);
  };

  const canGoBack = currentMonth > 0;
  const canGoForward = startIdx + 10 < allDates.length;

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

      {/* Calendar Grid */}
      <section className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
            disabled={!canGoBack}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">Webinar Calendar</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(currentMonth + 1)}
            disabled={!canGoForward}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid - TV Guide Style */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Header Row - Channels */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div className="font-semibold text-sm text-muted-foreground uppercase p-3">
                Date
              </div>
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className="font-semibold text-sm uppercase p-3 rounded-t-lg"
                  style={{
                    backgroundColor: `hsl(var(--${channel.color.replace('bg-', '')}))`,
                    color: 'hsl(var(--primary-foreground))',
                  }}
                >
                  {channel.name}
                </div>
              ))}
            </div>

            {/* Calendar Rows */}
            <div className="space-y-2">
              {visibleDates.map((date) => (
                <div key={date} className="grid grid-cols-4 gap-2">
                  {/* Date Column */}
                  <div className="bg-muted p-3 rounded-lg flex flex-col justify-center">
                    <div className="font-semibold">{format(parseISO(date), 'MMM d')}</div>
                    <div className="text-xs text-muted-foreground">{format(parseISO(date), 'EEEE')}</div>
                  </div>

                  {/* Channel Columns */}
                  {channels.map((channel) => {
                    const webinar = getWebinarForChannelAndDate(channel.id, date);
                    return (
                      <Card
                        key={channel.id}
                        className={`p-3 ${webinar ? 'hover:shadow-md cursor-pointer' : 'bg-muted/30'} transition-all`}
                      >
                        {webinar ? (
                          <div>
                            <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                              {webinar.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
                              {webinar.speaker}
                            </p>
                            <p className="text-xs font-medium text-primary">
                              {webinar.time}
                            </p>
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground text-center py-4">
                            No webinar
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-sm font-semibold mb-3">Channels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {channels.map((channel) => (
              <div key={channel.id} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: `hsl(var(--${channel.color.replace('bg-', '')}))` }}
                ></div>
                <span className="font-medium text-sm">{channel.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Webinars;
