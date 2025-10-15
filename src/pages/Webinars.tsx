import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, User, Check } from "lucide-react";
import { format, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

type Webinar = {
  channel: number;
  title: string;
  date: string;
  time: string;
  speaker: string;
  description?: string;
};

const Webinars = () => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [registeredWebinars, setRegisteredWebinars] = useState<string[]>([]);

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
  const webinars: Webinar[] = [
    { channel: 1, title: "Cloud Security Fundamentals", date: "2025-10-15", time: "2PM-3PM EDT", speaker: "Dr. James Smith, MIT", description: "Learn the fundamentals of cloud security architecture, best practices for data protection, and compliance requirements for government organizations." },
    { channel: 2, title: "Microsoft Azure Government Solutions", date: "2025-10-15", time: "3PM-4PM EDT", speaker: "Sarah Johnson, Microsoft", description: "Discover how Microsoft Azure Government cloud services can help your organization meet compliance requirements while modernizing infrastructure." },
    { channel: 3, title: "Digital Transformation Roadmap", date: "2025-10-16", time: "11AM-12PM EDT", speaker: "WRITA Leadership", description: "Join WRITA leaders as they outline strategies for successful digital transformation initiatives in government IT environments." },
    { channel: 1, title: "Data Analytics in Public Sector", date: "2025-10-22", time: "2PM-3PM EDT", speaker: "Prof. Maria Garcia, Stanford", description: "Explore advanced data analytics techniques and their applications in improving public sector decision-making and service delivery." },
    { channel: 2, title: "ServiceNow for Government", date: "2025-10-23", time: "1PM-2PM EDT", speaker: "Tom Wilson, ServiceNow", description: "Learn how ServiceNow's government cloud platform can streamline service delivery and improve constituent experiences." },
    { channel: 3, title: "Cybersecurity Best Practices", date: "2025-10-29", time: "10AM-11AM EDT", speaker: "Security Panel", description: "Expert panel discussion on the latest cybersecurity threats and proven strategies to protect government systems and data." },
    
    { channel: 1, title: "AI & Machine Learning Basics", date: "2025-11-05", time: "2PM-3PM EST", speaker: "Dr. Lisa Chen, Berkeley", description: "An introduction to artificial intelligence and machine learning concepts with practical applications for government use cases." },
    { channel: 2, title: "AWS GovCloud Deep Dive", date: "2025-11-06", time: "3PM-4PM EST", speaker: "Mike Roberts, AWS", description: "Comprehensive overview of AWS GovCloud features, security controls, and compliance certifications for government workloads." },
    { channel: 3, title: "Remote Work Infrastructure", date: "2025-11-12", time: "11AM-12PM EST", speaker: "IT Leaders Roundtable", description: "IT leaders share lessons learned and best practices for building robust remote work infrastructure and support systems." },
    { channel: 1, title: "Blockchain in Government", date: "2025-11-19", time: "2PM-3PM EST", speaker: "Prof. David Lee, Harvard", description: "Examine real-world blockchain applications in government including supply chain, identity management, and public records." },
    { channel: 2, title: "Salesforce Government Cloud", date: "2025-11-20", time: "1PM-2PM EST", speaker: "Jennifer Martinez, Salesforce", description: "Discover how Salesforce Government Cloud can transform constituent relationship management and service delivery." },
    { channel: 3, title: "Budget Planning for IT", date: "2025-11-26", time: "10AM-11AM EST", speaker: "Finance Committee", description: "Strategic guidance on IT budget planning, cost optimization, and securing funding for technology initiatives." },
    
    { channel: 1, title: "Privacy & Data Protection", date: "2025-12-03", time: "2PM-3PM EST", speaker: "Dr. Emily White, Georgetown", description: "Navigate privacy laws and regulations while implementing effective data protection strategies for government agencies." },
    { channel: 2, title: "Google Workspace for Gov", date: "2025-12-04", time: "3PM-4PM EST", speaker: "Alex Brown, Google", description: "Learn how Google Workspace for Government can enhance collaboration while meeting strict security and compliance requirements." },
    { channel: 3, title: "Year in Review: IT Trends", date: "2025-12-10", time: "11AM-12PM EST", speaker: "WRITA Team", description: "Review the top IT trends from 2025 and get insights into what's coming in the year ahead." },
    { channel: 1, title: "Open Source Technologies", date: "2025-12-17", time: "2PM-3PM EST", speaker: "Prof. Robert Kim, MIT", description: "Explore the benefits and considerations of adopting open source technologies in government IT environments." },
    
    { channel: 1, title: "Digital Identity Management", date: "2026-01-07", time: "2PM-3PM EST", speaker: "Dr. Amanda Taylor, Yale", description: "Advanced topics in digital identity management, authentication, and access control for government systems." },
    { channel: 2, title: "Oracle Cloud Infrastructure", date: "2026-01-08", time: "3PM-4PM EST", speaker: "Chris Anderson, Oracle", description: "Discover Oracle's cloud infrastructure solutions designed specifically for government workloads and compliance needs." },
    { channel: 3, title: "New Year Planning Session", date: "2026-01-14", time: "11AM-12PM EST", speaker: "Leadership Panel", description: "Join leadership for strategic planning discussions and goal setting for the year ahead." },
    { channel: 1, title: "IoT in Smart Cities", date: "2026-01-21", time: "2PM-3PM EST", speaker: "Prof. Kevin Park, Stanford", description: "Explore Internet of Things applications in smart city initiatives including infrastructure monitoring and public services." },
    { channel: 2, title: "VMware Government Solutions", date: "2026-01-22", time: "1PM-2PM EST", speaker: "Susan Lee, VMware", description: "Learn about VMware's virtualization and cloud solutions tailored for government security and compliance requirements." },
    { channel: 3, title: "Citizen Engagement Platforms", date: "2026-01-28", time: "10AM-11AM EST", speaker: "Community Leaders", description: "Best practices for building and maintaining effective digital platforms for citizen engagement and public participation." },
    
    { channel: 1, title: "Quantum Computing Intro", date: "2026-02-04", time: "2PM-3PM EST", speaker: "Dr. Michael Zhang, Caltech", description: "Introduction to quantum computing principles and potential applications in government and research organizations." },
    { channel: 2, title: "Dell Technologies for Gov", date: "2026-02-05", time: "3PM-4PM EST", speaker: "Patricia Rodriguez, Dell", description: "Overview of Dell's government solutions portfolio including hardware, software, and managed services." },
    { channel: 3, title: "Conference Preview & Prep", date: "2026-02-11", time: "11AM-12PM EST", speaker: "Conference Committee", description: "Get ready for the upcoming annual conference with session previews and networking tips." },
    { channel: 1, title: "5G Network Implementation", date: "2026-02-18", time: "2PM-3PM EST", speaker: "Prof. Nancy Wilson, MIT", description: "Technical overview of 5G network implementation including infrastructure requirements and use cases for government." },
    { channel: 2, title: "Cisco Networking Solutions", date: "2026-02-19", time: "1PM-2PM EST", speaker: "Mark Thompson, Cisco", description: "Explore Cisco's networking solutions for government including security features and compliance capabilities." },
    
    { channel: 1, title: "Ethical AI in Government", date: "2026-03-04", time: "2PM-3PM EST", speaker: "Dr. Rachel Green, Harvard", description: "Critical discussion on ethical considerations, bias mitigation, and responsible AI deployment in government services." },
    { channel: 2, title: "IBM Cloud Solutions", date: "2026-03-05", time: "3PM-4PM EST", speaker: "James Carter, IBM", description: "Learn about IBM's hybrid cloud solutions and AI capabilities designed for government transformation initiatives." },
    { channel: 3, title: "Pre-Conference Networking", date: "2026-03-11", time: "11AM-12PM EDT", speaker: "WRITA Team", description: "Virtual networking session to connect with peers before the annual conference begins." },
    { channel: 1, title: "Disaster Recovery Planning", date: "2026-03-18", time: "2PM-3PM EDT", speaker: "Prof. Steven Harris, Stanford", description: "Comprehensive disaster recovery planning strategies and business continuity best practices for government IT." },
    { channel: 2, title: "Red Hat Enterprise Linux", date: "2026-03-19", time: "1PM-2PM EDT", speaker: "Laura Martinez, Red Hat", description: "Explore Red Hat Enterprise Linux features, security, and support options for government deployments." },
    { channel: 3, title: "Final Conference Details", date: "2026-03-25", time: "10AM-11AM EDT", speaker: "Conference Team", description: "Last-minute details and logistics for the upcoming annual conference including venue information and agenda updates." },
  ];

  // Get unique dates and sort them
  const allDates = [...new Set(webinars.map(w => w.date))].sort();
  const startIdx = currentMonth * 10;
  const visibleDates = allDates.slice(startIdx, startIdx + 10);

  const getWebinarForChannelAndDate = (channelId: number, date: string) => {
    return webinars.find(w => w.channel === channelId && w.date === date);
  };

  const getWebinarId = (webinar: Webinar) => `${webinar.date}-${webinar.channel}`;

  const isRegistered = (webinar: Webinar) => {
    return registeredWebinars.includes(getWebinarId(webinar));
  };

  const handleRegister = (webinar: Webinar) => {
    const webinarId = getWebinarId(webinar);
    if (!registeredWebinars.includes(webinarId)) {
      setRegisteredWebinars([...registeredWebinars, webinarId]);
      toast({
        title: "Registration Successful!",
        description: `You've registered for ${webinar.title}`,
      });
    }
  };

  const generateCalendarLink = (webinar: Webinar, type: 'google' | 'ical') => {
    const startDate = parseISO(webinar.date);
    const title = encodeURIComponent(webinar.title);
    const details = encodeURIComponent(`Speaker: ${webinar.speaker}\n\n${webinar.description || ''}`);
    
    if (type === 'google') {
      const dateStr = format(startDate, 'yyyyMMdd');
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T140000Z/${dateStr}T150000Z&details=${details}`;
    }
    return '#'; // iCal would require a file download
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
          <h2 className="text-xl font-bold">Webinar Channel Guide</h2>
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
                    const registered = webinar && isRegistered(webinar);
                    return (
                      <Card
                        key={channel.id}
                        className={`p-3 ${webinar ? 'hover:shadow-md cursor-pointer' : 'bg-muted/30'} transition-all`}
                        onClick={() => webinar && setSelectedWebinar(webinar)}
                      >
                        {webinar ? (
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-semibold text-sm line-clamp-2 flex-1">
                                {webinar.title}
                              </h4>
                              {registered && (
                                <Badge variant="secondary" className="shrink-0 text-xs">
                                  <Check className="h-3 w-3 mr-1" />
                                  Registered
                                </Badge>
                              )}
                            </div>
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

      {/* Webinar Details Modal */}
      <Dialog open={!!selectedWebinar} onOpenChange={(open) => !open && setSelectedWebinar(null)}>
        <DialogContent className="max-w-2xl">
          {selectedWebinar && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedWebinar.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedWebinar.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="h-5 w-5" />
                  <span>{selectedWebinar.speaker}</span>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{format(parseISO(selectedWebinar.date), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{selectedWebinar.time}</span>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>Virtual Event</span>
                </div>

                {isRegistered(selectedWebinar) ? (
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-2 text-green-300">
                      <Check className="h-5 w-5" />
                      <span className="font-semibold">You're registered for this webinar!</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        onClick={() => window.open(generateCalendarLink(selectedWebinar, 'google'), '_blank')}
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Add to Google Calendar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Calendar Download",
                            description: "iCal file download would start here",
                          });
                        }}
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Download iCal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => handleRegister(selectedWebinar)}
                    >
                      Register for Webinar
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Webinars;
