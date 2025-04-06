
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import JobSummaryCard from "@/components/results/JobSummary";
import CandidateCard, { Candidate } from "@/components/results/CandidateCard";
import { getMockJobData, getMockCandidates } from "@/services/mockData";
import { toast } from "@/components/ui/sonner";
import { Search, ArrowUp, ArrowDown, Users, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Results = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);
  const jobData = getMockJobData();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setCandidates(getMockCandidates());
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleShortlist = (id: string) => {
    if (shortlistedIds.includes(id)) {
      setShortlistedIds(shortlistedIds.filter((candidateId) => candidateId !== id));
    } else {
      setShortlistedIds([...shortlistedIds, id]);
    }
  };

  const handleViewShortlist = () => {
    if (shortlistedIds.length === 0) {
      toast.error("No candidates have been shortlisted yet");
      return;
    }
    navigate("/shortlist");
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some((skill) => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.matchScore - b.matchScore;
    }
    return b.matchScore - a.matchScore;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Layout>
      <div className="page-container">
        <h1 className="text-3xl font-bold text-center mb-8">Matching Results</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Summary Section */}
          <div className="lg:col-span-1">
            <JobSummaryCard jobData={jobData} />
          </div>
          
          {/* Candidates Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-3 md:space-y-0">
                  <h2 className="text-xl font-semibold">Candidates ({filteredCandidates.length})</h2>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleViewShortlist}
                      className="whitespace-nowrap"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      View Shortlist ({shortlistedIds.length})
                    </Button>
                  </div>
                </div>
                
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleSortOrder}
                      className="h-10 w-10"
                    >
                      {sortOrder === "desc" ? (
                        <ArrowDown className="h-4 w-4" />
                      ) : (
                        <ArrowUp className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Select defaultValue="match">
                      <SelectTrigger className="w-[140px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="match">Match Score</SelectItem>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="skills">Skills</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Candidates List */}
                {isLoading ? (
                  <div className="py-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hirenova-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Analyzing candidates...</p>
                  </div>
                ) : sortedCandidates.length > 0 ? (
                  <div className="space-y-6">
                    {sortedCandidates.map((candidate) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        onShortlist={handleShortlist}
                        isShortlisted={shortlistedIds.includes(candidate.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-600">No candidates match your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
