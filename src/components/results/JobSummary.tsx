
import { FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface RequiredSkill {
  name: string;
  importance: "critical" | "preferred" | "bonus";
}

export interface JobSummary {
  title: string;
  company?: string;
  location?: string;
  jobType?: string;
  summary: string;
  requiredSkills: RequiredSkill[];
  responsibilities?: string[];
  qualifications?: string[];
}

interface JobSummaryCardProps {
  jobData: JobSummary;
}

const JobSummaryCard = ({ jobData }: JobSummaryCardProps) => {
  const getImportanceStyle = (importance: string) => {
    switch (importance) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "preferred":
        return "bg-blue-100 text-blue-800";
      case "bonus":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-hirenova-600 mb-1">
          <FileText className="w-5 h-5" />
          <span className="text-sm font-medium">Job Description</span>
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold">{jobData.title}</CardTitle>
        <CardDescription>
          {jobData.company && `${jobData.company} • `}
          {jobData.location && `${jobData.location} • `}
          {jobData.jobType && jobData.jobType}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-medium mb-2">Summary</h3>
            <p className="text-sm text-gray-600">{jobData.summary}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-md font-medium mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {jobData.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImportanceStyle(
                    skill.importance
                  )}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {jobData.responsibilities && jobData.responsibilities.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-md font-medium mb-2">Key Responsibilities</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {jobData.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {jobData.qualifications && jobData.qualifications.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-md font-medium mb-2">Qualifications</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {jobData.qualifications.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobSummaryCard;
