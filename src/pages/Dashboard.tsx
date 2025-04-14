
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/components/CourseCard";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { mockCourses, mockUserProgress } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, this would be fetched based on the logged-in user
  const userProgress = mockUserProgress;
  const enrolledCourses = mockCourses.filter(course => 
    userProgress.some(progress => progress.courseId === course.id)
  );
  const recommendedCourses = mockCourses.filter(course => 
    !userProgress.some(progress => progress.courseId === course.id)
  ).slice(0, 3);

  // Calculate total BCH earned
  const totalEarned = userProgress.reduce((sum, progress) => sum + progress.rewardsEarned, 0);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-montserrat mb-2">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Continue your journey into blockchain technology</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-card p-3 rounded-md">
            <div className="h-10 w-10 rounded-full bg-bitcoin/10 flex items-center justify-center text-bitcoin">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.172 14.828a4 4 0 1 0 5.656-5.656"/><path d="M17.67 17.67a10 10 0 1 0-14.14-14.14"/></svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total BCH Earned</p>
              <p className="text-2xl font-bold text-bitcoincash">{totalEarned.toFixed(3)} BCH</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            {/* Progress Summary */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                  <p className="text-xs text-muted-foreground">
                    of {mockCourses.length} available courses
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(userProgress.reduce((sum, progress) => sum + progress.percentComplete, 0) / userProgress.length)}%
                  </div>
                  <Progress 
                    value={userProgress.reduce((sum, progress) => sum + progress.percentComplete, 0) / userProgress.length} 
                    className="h-1 mt-2" 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">BCH Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-bitcoincash">{totalEarned.toFixed(3)}</div>
                  <p className="text-xs text-muted-foreground">
                    ≈ ${(totalEarned * 180).toFixed(2)} USD
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Potential Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-bitcoin">0.025</div>
                  <p className="text-xs text-muted-foreground">
                    complete courses to earn
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Continue Learning Section */}
            <div>
              <h2 className="font-semibold text-xl mb-4">Continue Learning</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map(course => {
                  const progress = userProgress.find(p => p.courseId === course.id)?.percentComplete || 0;
                  return (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      progress={progress}
                      onEnroll={() => navigate(`/course/${course.id}`)} 
                    />
                  );
                })}
              </div>
            </div>
            
            {/* Recommended Courses */}
            <div>
              <h2 className="font-semibold text-xl mb-4">Recommended for You</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendedCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course}
                    onEnroll={() => navigate(`/course/${course.id}`)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-8">
            <h2 className="font-semibold text-xl mb-4">My Courses</h2>
            {enrolledCourses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map(course => {
                  const progress = userProgress.find(p => p.courseId === course.id)?.percentComplete || 0;
                  return (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      progress={progress}
                      onEnroll={() => navigate(`/course/${course.id}`)}
                    />
                  );
                })}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <CardContent>
                  <p className="mb-4">You haven't enrolled in any courses yet.</p>
                  <button 
                    className="text-primary underline"
                    onClick={() => navigate('/courses')}
                  >
                    Browse available courses
                  </button>
                </CardContent>
              </Card>
            )}
            
            <h2 className="font-semibold text-xl mb-4 mt-8">Completed Courses</h2>
            <Card className="p-8 text-center">
              <CardContent>
                <p className="mb-4">You haven't completed any courses yet.</p>
                <button className="text-muted-foreground">
                  Complete a course to earn BCH rewards
                </button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewards" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>BCH Balance</CardTitle>
                  <CardDescription>Your current rewards balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-bitcoincash">{totalEarned.toFixed(3)} BCH</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Approximate value: ${(totalEarned * 180).toFixed(2)} USD
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Withdrawal Address</CardTitle>
                  <CardDescription>Your Bitcoin Cash wallet address</CardDescription>
                </CardHeader>
                <CardContent>
                  {user?.walletAddress ? (
                    <div>
                      <div className="bg-muted p-2 rounded-md text-xs break-all">
                        {user.walletAddress}
                      </div>
                      <button className="text-sm text-primary mt-2">Update Address</button>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-2">No wallet address configured</p>
                      <button className="text-sm text-primary">Add Wallet Address</button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Potential Rewards</CardTitle>
                  <CardDescription>Complete courses to earn more</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-bitcoin">0.025 BCH</div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Course completion</span>
                      <span>+0.015 BCH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Quiz excellence</span>
                      <span>+0.010 BCH</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <h2 className="font-semibold text-xl mb-4 mt-8">Reward Transactions</h2>
            <Card>
              <div className="p-6">
                <div className="text-center py-8">
                  <p className="mb-2">No reward transactions yet</p>
                  <p className="text-sm text-muted-foreground">
                    Complete courses to earn BCH rewards
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
