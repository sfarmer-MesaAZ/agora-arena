import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Award } from "lucide-react";
import trailheadBanner from "@/assets/trailhead-banner.png";

const Conference = () => {
  const highlights = [
    {
      icon: Calendar,
      title: "April 26-28, 2026",
      description: "Three full days of innovation and collaboration",
    },
    {
      icon: MapPin,
      title: "Harrah's Lake Tahoe",
      description: "15 US-50, Stateline, NV 89449",
    },
    {
      icon: Users,
      title: "500+ Attendees",
      description: "Government IT leaders from across the region",
    },
    {
      icon: Award,
      title: "50+ Sessions",
      description: "Workshops, panels, and keynote presentations",
    },
  ];

  const agenda = [
    {
      day: "Day 1 - April 26",
      sessions: [
        { time: "8:00 AM", title: "Registration & Continental Breakfast", type: "General" },
        { time: "9:00 AM", title: "Opening Keynote: Turning Vision into Action", type: "Keynote" },
        { time: "10:30 AM", title: "Break & Networking", type: "Break" },
        { time: "11:00 AM", title: "Track Sessions: Cloud, Security, Innovation", type: "Sessions" },
        { time: "12:30 PM", title: "Lunch & Vendor Showcase", type: "Networking" },
        { time: "2:00 PM", title: "Afternoon Workshop Sessions", type: "Workshop" },
        { time: "5:00 PM", title: "Welcome Reception", type: "Social" },
      ],
    },
    {
      day: "Day 2 - April 27",
      sessions: [
        { time: "8:00 AM", title: "Breakfast & Morning Networking", type: "General" },
        { time: "9:00 AM", title: "Innovation Showcase & Demos", type: "Showcase" },
        { time: "10:30 AM", title: "Break", type: "Break" },
        { time: "11:00 AM", title: "Breakout Sessions", type: "Sessions" },
        { time: "12:30 PM", title: "Lunch & Panel Discussion", type: "Panel" },
        { time: "2:00 PM", title: "Hands-on Labs & Workshops", type: "Workshop" },
        { time: "6:00 PM", title: "Evening Gala Dinner", type: "Social" },
      ],
    },
    {
      day: "Day 3 - April 28",
      sessions: [
        { time: "8:00 AM", title: "Continental Breakfast", type: "General" },
        { time: "9:00 AM", title: "Closing Keynote: The Road Ahead", type: "Keynote" },
        { time: "10:30 AM", title: "Awards & Recognition Ceremony", type: "Awards" },
        { time: "11:30 AM", title: "Final Networking & Farewells", type: "Networking" },
        { time: "12:00 PM", title: "Conference Concludes", type: "General" },
      ],
    },
  ];

  const speakers = [
    { name: "Dr. Sarah Mitchell", title: "Federal CIO", topic: "Digital Government Strategy" },
    { name: "James Rodriguez", title: "VP Innovation, Tech Corp", topic: "AI in Public Sector" },
    { name: "Emily Chen", title: "State CISO, Nevada", topic: "Cybersecurity Frameworks" },
    { name: "Michael Thompson", title: "Director, Cloud Services", topic: "Multi-Cloud Strategy" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Banner */}
      <section className="relative">
        <div className="w-full h-64 md:h-96 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
          <img
            src={trailheadBanner}
            alt="TRAILHEAD - The Journey of Government IT Innovation"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </section>

      {/* Conference Info */}
      <section className="container mx-auto px-4 -mt-20 relative z-10">
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-4">
            <Badge className="w-fit mx-auto mb-4 text-lg px-4 py-1">
              WRITA Spring Conference
            </Badge>
            <CardTitle className="text-3xl md:text-4xl mb-2">
              TRAILHEAD (BUILD)
            </CardTitle>
            <CardDescription className="text-xl">
              Turning Vision into Action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-base">
                Register Now
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Download Brochure
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Featured Speakers */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Speakers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker, idx) => (
            <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-4"></div>
                <CardTitle className="text-lg">{speaker.name}</CardTitle>
                <CardDescription className="text-sm">{speaker.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-xs">
                  {speaker.topic}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Agenda */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Conference Agenda</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {agenda.map((day, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-xl">{day.day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {day.sessions.map((session, sidx) => (
                      <div key={sidx} className="border-l-2 border-primary/20 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {session.time}
                          </span>
                          <Badge variant="outline" className="text-xs ml-auto">
                            {session.type}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{session.title}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Don't miss this opportunity to connect with peers, learn from experts, and shape the future of government IT innovation.
        </p>
        <Button size="lg" className="text-lg px-8">
          Register for TRAILHEAD BUILD
        </Button>
      </section>
    </div>
  );
};

export default Conference;
