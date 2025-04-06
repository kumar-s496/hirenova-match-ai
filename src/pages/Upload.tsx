
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import FileUpload from "@/components/upload/FileUpload";
import ProgressTracker, { Step } from "@/components/upload/ProgressTracker";
import { processFiles } from "@/services/mockData";
import { toast } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

const uploadSteps: Step[] = [
  { id: 0, name: "Job Description", description: "Upload the job description" },
  { id: 1, name: "Resumes", description: "Upload candidate resumes" },
  { id: 2, name: "Processing", description: "AI analyses the documents" },
];

const Upload = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File[]>([]);
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleJobDescriptionUpload = (files: File[]) => {
    setJobDescriptionFile(files);
  };

  const handleResumeUpload = (files: File[]) => {
    setResumeFiles(files);
  };

  const handleNextStep = async () => {
    if (currentStep === 0 && jobDescriptionFile.length === 0) {
      toast.error("Please upload a job description");
      return;
    }

    if (currentStep === 1 && resumeFiles.length === 0) {
      toast.error("Please upload at least one resume");
      return;
    }

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsProcessing(true);
      try {
        // Simulate processing the files
        await processFiles([...jobDescriptionFile, ...resumeFiles]);
        navigate("/results");
      } catch (error) {
        toast.error("An error occurred while processing the files");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <FileUpload
                label="Upload Job Description"
                description="Drag and drop your job description file here, or click to browse"
                acceptedFileTypes=".pdf,.docx,.doc"
                maxFiles={1}
                onFilesChange={handleJobDescriptionUpload}
              />
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <FileUpload
                label="Upload Candidate Resumes"
                description="Drag and drop candidate resume files here, or click to browse"
                acceptedFileTypes=".pdf,.docx,.doc"
                maxFiles={10}
                onFilesChange={handleResumeUpload}
              />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="mt-6">
            <CardContent className="pt-6 pb-6">
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-4">Ready to Process Files</h3>
                <p className="mb-6 text-gray-600">
                  We'll analyze {jobDescriptionFile.length} job description and {resumeFiles.length} candidate {resumeFiles.length === 1 ? "resume" : "resumes"}.
                </p>
                <Button
                  size="lg"
                  onClick={handleNextStep}
                  disabled={isProcessing}
                  className="w-full md:w-auto"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Start Processing"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Upload Documents</h1>
          
          <ProgressTracker steps={uploadSteps} currentStep={currentStep} />
          
          {renderStepContent()}
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 0 || isProcessing}
            >
              Previous
            </Button>
            
            {currentStep < 2 && (
              <Button onClick={handleNextStep} disabled={isProcessing}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
