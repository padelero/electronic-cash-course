
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  course: Course;
  progress?: number;
  onEnroll?: () => void;
}

export function CourseCard({ course, progress, onEnroll }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={course.imageUrl || "/placeholder.svg"}
          alt={course.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-2 top-2">
          <Badge className={course.level === 'beginner' ? "bg-bitcoincash" : course.level === 'intermediate' ? "bg-bitcoin" : "bg-primary"}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="font-montserrat font-semibold text-lg line-clamp-1">{course.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">By {course.instructor}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{course.description}</p>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock-3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16.5 12"/></svg>
            {course.estimatedHours} hours
          </span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            {course.modules.length} modules
          </span>
        </div>

        {progress !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="font-semibold flex items-center">
          {course.currency === 'BCH' ? (
            <>
              <span className="text-bitcoincash mr-1">₿</span>
              {course.price}
            </>
          ) : (
            <>
              <span className="mr-1">$</span>
              {course.price}
            </>
          )}
        </div>
        <Button 
          onClick={onEnroll}
          className={progress !== undefined ? "bg-bitcoin hover:bg-bitcoin/90" : "bg-bitcoincash hover:bg-bitcoincash/90"}
        >
          {progress !== undefined ? "Continue" : "Enroll Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
