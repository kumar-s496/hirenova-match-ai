
import { useState } from "react";
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export interface Skill {
  name: string;
  match: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  skills: Skill[];
  experience: string;
  matchScore: number;
  resumeUrl?: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  onShortlist: (id: string) => void;
  isShortlisted: boolean;
}

const CandidateCard = ({ candidate, onShortlist, isShortlisted }: CandidateCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleShortlist = () => {
    onShortlist(candidate.id);
    if (!isShortlisted) {
      toast.success(`${candidate.name} has been added to the shortlist`);
    } else {
      toast.info(`${candidate.name} has been removed from the shortlist`);
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMatchScoreProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 card-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-hirenova-100 rounded-full flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-hirenova-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <p className="text-sm text-gray-600">{candidate.email}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xl font-bold ${getMatchScoreColor(candidate.matchScore)}`}>
              {candidate.matchScore}%
            </div>
            <div className="text-xs text-gray-500">Match Score</div>
          </div>
        </div>

        <div className="mt-4">
          <Progress 
            value={candidate.matchScore} 
            className="h-2"
            // Fixed: Use className with cn utility to apply the background color
            className={cn("h-2", getMatchScoreProgressColor(candidate.matchScore))}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.skills.slice(0, expanded ? undefined : 5).map((skill, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                skill.match
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {skill.match && <CheckCircle className="w-3 h-3 mr-1" />}
              {!skill.match && <AlertCircle className="w-3 h-3 mr-1" />}
              {skill.name}
            </span>
          ))}
          
          {candidate.skills.length > 5 && !expanded && (
            <button
              className="text-xs text-hirenova-600 hover:text-hirenova-800"
              onClick={() => setExpanded(true)}
            >
              +{candidate.skills.length - 5} more
            </button>
          )}
        </div>

        <div className={`mt-4 ${expanded ? "block" : "hidden"}`}>
          <div className="text-sm">
            <p className="font-semibold">Experience:</p>
            <p className="text-gray-600">{candidate.experience}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Less details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                More details
              </>
            )}
          </Button>

          <Button
            variant={isShortlisted ? "outline" : "default"}
            size="sm"
            className={isShortlisted ? "border-hirenova-600 text-hirenova-600" : ""}
            onClick={handleShortlist}
          >
            {isShortlisted ? "Shortlisted" : "Shortlist"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
