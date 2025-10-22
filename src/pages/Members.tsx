import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, MapPin, Users, ExternalLink, Mail, Phone, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const Members = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<any | null>(null);

  const cities = [
    {
      name: "Phoenix, AZ",
      coordinates: [-112.074, 33.4484],
      count: 12,
      members: [
        { name: "John Smith", title: "IT Director", org: "Arizona State IT" },
        { name: "Maria Garcia", title: "CTO", org: "City of Phoenix" },
        { name: "Robert Chen", title: "Systems Manager", org: "Maricopa County" },
      ],
    },
    {
      name: "Las Vegas, NV",
      coordinates: [-115.1398, 36.1699],
      count: 8,
      members: [
        { name: "Sarah Johnson", title: "Chief Information Officer", org: "Nevada State IT" },
        { name: "Michael Torres", title: "IT Manager", org: "Clark County" },
        { name: "Emily White", title: "Technology Director", org: "City of Las Vegas" },
      ],
    },
    {
      name: "Portland, OR",
      coordinates: [-122.6765, 45.5231],
      count: 15,
      members: [
        { name: "Jennifer Martinez", title: "Digital Services Director", org: "Oregon Digital Services" },
        { name: "David Lee", title: "CIO", org: "City of Portland" },
        { name: "Amanda Brown", title: "IT Director", org: "Multnomah County" },
      ],
    },
    {
      name: "Seattle, WA",
      coordinates: [-122.3321, 47.6062],
      count: 18,
      members: [
        { name: "James Wilson", title: "State CIO", org: "Washington State CIO" },
        { name: "Lisa Anderson", title: "Technology Director", org: "City of Seattle" },
        { name: "Thomas Rodriguez", title: "IT Manager", org: "King County" },
      ],
    },
    {
      name: "Salt Lake City, UT",
      coordinates: [-111.8910, 40.7608],
      count: 10,
      members: [
        { name: "David Thompson", title: "Director of IT", org: "Utah IT Services" },
        { name: "Rachel Kim", title: "CTO", org: "Salt Lake County" },
        { name: "Kevin Park", title: "Technology Manager", org: "City of SLC" },
      ],
    },
    {
      name: "Denver, CO",
      coordinates: [-104.9903, 39.7392],
      count: 14,
      members: [
        { name: "Christopher Green", title: "CIO", org: "Colorado IT" },
        { name: "Michelle Taylor", title: "IT Director", org: "City of Denver" },
        { name: "Andrew Martinez", title: "Systems Director", org: "Denver County" },
      ],
    },
  ];

  const organizations = [
    {
      name: "Arizona State IT",
      type: "State Government",
      location: "Phoenix, AZ",
      members: 45,
      website: "https://aset.az.gov",
      description: "Leading digital transformation across Arizona state agencies with innovative technology solutions and cybersecurity initiatives.",
      contact: "info@aset.az.gov",
      phone: "(602) 542-3711",
    },
    {
      name: "Nevada State IT",
      type: "State Government",
      location: "Carson City, NV",
      members: 38,
      website: "https://it.nv.gov",
      description: "Providing enterprise IT services and support to Nevada state agencies while modernizing infrastructure and systems.",
      contact: "info@it.nv.gov",
      phone: "(775) 684-5800",
    },
    {
      name: "Oregon Digital Services",
      type: "State Government",
      location: "Salem, OR",
      members: 52,
      website: "https://www.oregon.gov/das/EISPD",
      description: "Driving innovation in digital government services with focus on citizen experience and modern technology platforms.",
      contact: "contact@oregon.gov",
      phone: "(503) 378-3106",
    },
    {
      name: "Washington State CIO",
      type: "State Government",
      location: "Olympia, WA",
      members: 61,
      website: "https://ocio.wa.gov",
      description: "Championing technology excellence and digital innovation across Washington state with comprehensive IT governance.",
      contact: "ocio@wa.gov",
      phone: "(360) 407-8647",
    },
    {
      name: "City of Portland",
      type: "Municipal",
      location: "Portland, OR",
      members: 28,
      website: "https://www.portlandoregon.gov/bts",
      description: "Delivering innovative technology solutions to support city operations and enhance services for Portland residents.",
      contact: "bts@portlandoregon.gov",
      phone: "(503) 823-5200",
    },
    {
      name: "Utah IT Services",
      type: "State Government",
      location: "Salt Lake City, UT",
      members: 42,
      website: "https://dts.utah.gov",
      description: "Providing reliable, secure IT infrastructure and services to enable efficient government operations statewide.",
      contact: "info@utah.gov",
      phone: "(801) 538-3298",
    },
  ];

  const selectedCityData = cities.find((c) => c.name === selectedCity);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Member Directory</h1>
          <p className="text-xl text-primary-foreground/90">
            Connect with IT leaders and organizations across the region
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">380+</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">52</div>
              <div className="text-sm text-muted-foreground">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">States</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">85+</div>
              <div className="text-sm text-muted-foreground">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Member Locations</CardTitle>
            <CardDescription>Click on a city marker to view members in that location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-[400] h-[800px] bg-muted/20 rounded-lg overflow-hidden">
              <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#E5E7EB"
                        stroke="#9CA3AF"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#D1D5DB" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {cities.map((city) => (
                  <Marker key={city.name} coordinates={city.coordinates}>
                    <circle
                      r={8}
                      fill="hsl(var(--primary))"
                      stroke="#fff"
                      strokeWidth={2}
                      className="cursor-pointer hover:r-10 transition-all"
                      onClick={() => setSelectedCity(city.name)}
                    />
                    <text
                      textAnchor="middle"
                      y={-15}
                      style={{ fontSize: "10px", fill: "hsl(var(--foreground))", fontWeight: 600 }}
                    >
                      {city.count}
                    </text>
                  </Marker>
                ))}
              </ComposableMap>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Organizations Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Member Organizations</h2>
          <div className="flex items-center gap-2 max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search organizations..." />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org, idx) => (
            <Card
              key={idx}
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedOrg(org)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary">{org.type}</Badge>
                </div>
                <CardTitle className="text-lg">{org.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {org.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{org.members} members</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* City Members Dialog */}
      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {selectedCity}
            </DialogTitle>
            <DialogDescription>
              {selectedCityData?.count} members in this location
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {selectedCityData?.members.map((member, idx) => (
              <Card key={idx} className="cursor-pointer hover:bg-muted/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {member.title}
                  </CardDescription>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Building2 className="h-3 w-3" />
                    <span>{member.org}</span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Organization Details Dialog */}
      <Dialog open={!!selectedOrg} onOpenChange={() => setSelectedOrg(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="flex items-start gap-4 mb-2">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-2xl mb-1">{selectedOrg?.name}</DialogTitle>
                <DialogDescription className="text-base">{selectedOrg?.type}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          {selectedOrg && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{selectedOrg.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Location</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {selectedOrg.location}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Members</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {selectedOrg.members} active members
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Email</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {selectedOrg.contact}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Phone</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {selectedOrg.phone}
                  </div>
                </div>
              </div>
              <Button className="w-full" asChild>
                <a href={selectedOrg.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Members;
