
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCourses } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Courses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [currencyFilter, setCurrencyFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("default");

  // Filter courses based on search query and filters
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLevel = !levelFilter || course.level === levelFilter;
    const matchesCurrency = !currencyFilter || course.currency === currencyFilter;
    
    return matchesSearch && matchesLevel && matchesCurrency;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    } else if (sortBy === "price-desc") {
      return b.price - a.price;
    } else if (sortBy === "duration-asc") {
      return a.estimatedHours - b.estimatedHours;
    } else if (sortBy === "duration-desc") {
      return b.estimatedHours - a.estimatedHours;
    }
    return 0;
  });

  // Get unique values for filters
  const levels = Array.from(new Set(mockCourses.map(course => course.level)));
  const currencies = Array.from(new Set(mockCourses.map(course => course.currency)));

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Explore Our Blockchain Courses
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a wide range of courses covering Bitcoin, Bitcoin Cash, and blockchain technology.
            Learn at your own pace and earn rewards as you complete your educational journey.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search courses by title, description or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="duration-asc">Duration (Short to Long)</SelectItem>
                <SelectItem value="duration-desc">Duration (Long to Short)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium flex items-center">Filters:</span>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mr-1">Level:</span>
              {levels.map(level => (
                <Badge
                  key={level}
                  variant={levelFilter === level ? "default" : "outline"}
                  className={`cursor-pointer ${levelFilter === level ? (level === 'beginner' ? "bg-bitcoincash hover:bg-bitcoincash/90" : level === 'intermediate' ? "bg-bitcoin hover:bg-bitcoin/90" : "") : ""}`}
                  onClick={() => setLevelFilter(levelFilter === level ? null : level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 ml-4">
              <span className="text-sm text-muted-foreground mr-1">Currency:</span>
              {currencies.map(currency => (
                <Badge
                  key={currency}
                  variant={currencyFilter === currency ? "default" : "outline"}
                  className={`cursor-pointer ${currencyFilter === currency && currency === 'BCH' ? "bg-bitcoincash hover:bg-bitcoincash/90" : ""}`}
                  onClick={() => setCurrencyFilter(currencyFilter === currency ? null : currency)}
                >
                  {currency}
                </Badge>
              ))}
            </div>
            
            {(levelFilter || currencyFilter) && (
              <Button
                variant="link"
                className="text-sm p-0 h-auto"
                onClick={() => {
                  setLevelFilter(null);
                  setCurrencyFilter(null);
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Course grid */}
        {sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={() => navigate(`/course/${course.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setLevelFilter(null);
                setCurrencyFilter(null);
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
