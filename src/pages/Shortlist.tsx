
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { getMockCandidates } from "@/services/mockData";
import { Candidate } from "@/components/results/CandidateCard";
import { toast } from "@/lib/toast";
import { Calendar, Clock, Users, ArrowLeft, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shortlist = () => {
  const navigate = useNavigate();
  const [shortlistedCandidates, setShortlistedCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [scheduledInterviews, setScheduledInterviews] = useState<Record<string, { date: string; time: string }>>({});

  useEffect(() => {
    // In a real app, we would get the shortlisted IDs from a global state or storage
    // Here we'll just use the top 3 candidates
    const allCandidates = getMockCandidates();
    const sortedCandidates = [...allCandidates].sort((a, b) => b.matchScore - a.matchScore);
    setShortlistedCandidates(sortedCandidates.slice(0, 3));
    setIsLoading(false);
  }, []);

  const handleScheduleInterview = () => {
    if (!selectedCandidateId || !selectedDate || !selectedTime) {
      toast.error("Please select a date and time for the interview");
      return;
    }

    setScheduledInterviews({
      ...scheduledInterviews,
      [selectedCandidateId]: { date: selectedDate, time: selectedTime },
    });

    toast.success("Interview scheduled successfully!");
    setSelectedCandidateId(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const formattedDate = date.toISOString().split("T")[0];
        const displayDate = date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        dates.push({ value: formattedDate, label: displayDate });
      }
    }
    
    return dates;
  };

  const getAvailableTimes = () => {
    const times = [];
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === endHour && minute > 0) continue;
        
        const formattedHour = hour % 12 || 12;
        const period = hour < 12 ? "AM" : "PM";
        const formattedMinute = minute === 0 ? "00" : minute;
        
        const timeValue = `${hour.toString().padStart(2, "0")}:${formattedMinute.toString().padStart(2, "0")}`;
        const displayTime = `${formattedHour}:${formattedMinute} ${period}`;
        
        times.push({ value: timeValue, label: displayTime });
      }
    }
    
    return times;
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shortlisted Candidates</h1>
          <Button variant="outline" onClick={() => navigate("/results")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
        </div>
        
        {isLoading ? (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hirenova-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading shortlisted candidates...</p>
          </div>
        ) : shortlistedCandidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlistedCandidates.map((candidate) => (
              <Card key={candidate.id} className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-hirenova-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-lg font-bold text-hirenova-600">
                        {candidate.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.email}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-24 text-sm font-medium text-gray-500">Match Score:</div>
                      <div className="font-semibold text-hirenova-600">{candidate.matchScore}%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-24 text-sm font-medium text-gray-500">Skills:</div>
                      <div className="text-sm">
                        {candidate.skills
                          .filter((skill) => skill.match)
                          .slice(0, 3)
                          .map((skill) => skill.name)
                          .join(", ")}
                        {candidate.skills.filter((skill) => skill.match).length > 3 && "..."}
                      </div>
                    </div>
                  </div>

                  {scheduledInterviews[candidate.id] ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                      <div className="flex items-center text-green-800 font-medium mb-1">
                        <Check className="w-4 h-4 mr-2" />
                        Interview Scheduled
                      </div>
                      <div className="text-sm text-green-700">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(scheduledInterviews[candidate.id].date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-2" />
                          {scheduledInterviews[candidate.id].time}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full"
                          onClick={() => setSelectedCandidateId(candidate.id)}
                        >
                          Schedule Interview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Schedule Interview</DialogTitle>
                          <DialogDescription>
                            Select a date and time to schedule an interview with {candidate.name}.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm font-medium col-span-1">
                              Date
                            </label>
                            <div className="col-span-3">
                              <Select
                                value={selectedDate}
                                onValueChange={setSelectedDate}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select date" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Available Dates</SelectLabel>
                                    {getAvailableDates().map((date) => (
                                      <SelectItem key={date.value} value={date.value}>
                                        {date.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm font-medium col-span-1">
                              Time
                            </label>
                            <div className="col-span-3">
                              <Select
                                value={selectedTime}
                                onValueChange={setSelectedTime}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Available Times</SelectLabel>
                                    {getAvailableTimes().map((time) => (
                                      <SelectItem key={time.value} value={time.value}>
                                        {time.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button onClick={handleScheduleInterview}>
                            Schedule Interview
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No candidates shortlisted yet</h3>
              <p className="text-gray-600 mb-6">
                Return to the results page to shortlist candidates for interviews.
              </p>
              <Button onClick={() => navigate("/results")}>
                Go to Results
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Shortlist;
