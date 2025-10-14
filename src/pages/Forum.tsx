import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, Eye, Clock } from "lucide-react";

const Forum = () => {
  const topics = [
    {
      id: 1,
      title: "Cloud Migration Strategies for Government Agencies",
      author: "Sarah Johnson",
      organization: "Nevada State IT",
      category: "Cloud Computing",
      replies: 24,
      views: 342,
      likes: 18,
      lastActivity: "2 hours ago",
      isHot: true,
    },
    {
      id: 2,
      title: "Implementing Zero Trust Security Framework",
      author: "Michael Chen",
      organization: "Arizona Cyber Division",
      category: "Cybersecurity",
      replies: 31,
      views: 428,
      likes: 25,
      lastActivity: "5 hours ago",
      isHot: true,
    },
    {
      id: 3,
      title: "AI & Machine Learning in Public Services",
      author: "Jennifer Martinez",
      organization: "Oregon Digital Services",
      category: "Innovation",
      replies: 19,
      views: 287,
      likes: 22,
      lastActivity: "1 day ago",
      isHot: false,
    },
    {
      id: 4,
      title: "Best Practices for Remote Work Infrastructure",
      author: "David Thompson",
      organization: "Utah IT Services",
      category: "Infrastructure",
      replies: 42,
      views: 591,
      likes: 34,
      lastActivity: "1 day ago",
      isHot: true,
    },
    {
      id: 5,
      title: "Data Privacy Compliance: GDPR & CCPA",
      author: "Emily Rodriguez",
      organization: "California Privacy Office",
      category: "Compliance",
      replies: 15,
      views: 223,
      likes: 12,
      lastActivity: "2 days ago",
      isHot: false,
    },
    {
      id: 6,
      title: "Modernizing Legacy Systems Without Breaking the Bank",
      author: "Robert Lee",
      organization: "Washington State CIO",
      category: "Digital Transformation",
      replies: 28,
      views: 376,
      likes: 31,
      lastActivity: "3 days ago",
      isHot: false,
    },
    {
      id: 7,
      title: "Citizen Engagement Platforms: What's Working?",
      author: "Amanda White",
      organization: "Idaho Digital Government",
      category: "Digital Services",
      replies: 21,
      views: 298,
      likes: 19,
      lastActivity: "3 days ago",
      isHot: false,
    },
    {
      id: 8,
      title: "Open Source vs Commercial: Making the Right Choice",
      author: "James Wilson",
      organization: "Montana IT Department",
      category: "Technology Strategy",
      replies: 37,
      views: 455,
      likes: 27,
      lastActivity: "4 days ago",
      isHot: false,
    },
    {
      id: 9,
      title: "Blockchain Applications in Government",
      author: "Lisa Anderson",
      organization: "New Mexico Innovation Lab",
      category: "Emerging Tech",
      replies: 18,
      views: 267,
      likes: 15,
      lastActivity: "5 days ago",
      isHot: false,
    },
  ];

  const categories = [
    "All Topics",
    "Cloud Computing",
    "Cybersecurity",
    "Innovation",
    "Infrastructure",
    "Compliance",
    "Digital Transformation",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Forum Discussions</h1>
          <p className="text-xl text-primary-foreground/90">
            Active topics from the last 60 days
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All Topics" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-4">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {topic.category}
                      </Badge>
                      {topic.isHot && (
                        <Badge variant="destructive" className="text-xs">
                          Hot
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2 hover:text-primary transition-colors">
                      {topic.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      <span className="font-medium">{topic.author}</span>
                      <span className="text-muted-foreground"> · {topic.organization}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{topic.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{topic.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{topic.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Clock className="h-4 w-4" />
                    <span>{topic.lastActivity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Forum;
