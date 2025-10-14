import { Link } from "react-router-dom";
import { MessageSquare, Calendar, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Forum Discussions",
      description: "Engage with peers on the latest topics in government IT innovation",
      link: "/forum",
      color: "from-primary to-primary/80",
    },
    {
      icon: Calendar,
      title: "Webinar Schedule",
      description: "Access educational content from academic and vendor presentations",
      link: "/webinars",
      color: "from-secondary to-secondary/80",
    },
    {
      icon: Award,
      title: "Spring Conference",
      description: "Join us for TRAILHEAD BUILD - Turning Vision into Action",
      link: "/conference",
      color: "from-accent-foreground to-accent-foreground/80",
    },
    {
      icon: Users,
      title: "Member Directory",
      description: "Connect with members and organizations across the region",
      link: "/members",
      color: "from-primary/60 to-primary/40",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Western Regional Innovation & Technology Alliance
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              The Journey of Government IT Innovation
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/forum">Explore Forum</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground">
                <Link to="/conference">View Conference</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.link}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Recent Activity</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Latest Forum Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="hover:text-foreground cursor-pointer transition-colors">
                    Cloud Migration Strategies for Government
                  </li>
                  <li className="hover:text-foreground cursor-pointer transition-colors">
                    Cybersecurity Best Practices 2025
                  </li>
                  <li className="hover:text-foreground cursor-pointer transition-colors">
                    AI Integration in Public Services
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Webinars</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="hover:text-foreground cursor-pointer transition-colors">
                    Digital Transformation Roadmap
                  </li>
                  <li className="hover:text-foreground cursor-pointer transition-colors">
                    Modern Data Architecture
                  </li>
                  <li className="hover:text-foreground cursor-pointer transition-colors">
                    Vendor Spotlight: Innovation Solutions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">New Members</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="hover:text-foreground cursor-pointer transition-colors">
                    City of Portland IT Department
                  </li>
                  <li className="hover:text-foreground cursor-pointer transition-colors">
                    Nevada State Technology Office
                  </li>
                  <li className="hover:text-foreground cursor-pointer transition-colors">
                    Arizona Digital Government
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
