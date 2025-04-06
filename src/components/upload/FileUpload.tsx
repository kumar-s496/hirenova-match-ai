import { useState, useRef } from "react";
import { Upload, X, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

interface FileUploadProps {
  label: string;
  description: string;
  acceptedFileTypes?: string;
  maxFiles?: number;
  onFilesChange: (files: File[]) => void;
}

const FileUpload = ({
  label,
  description,
  acceptedFileTypes = ".pdf,.docx,.doc",
  maxFiles = 1,
  onFilesChange,
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    
    // Validate file types
    const invalidFiles = newFiles.filter(
      (file) => !file.name.match(new RegExp(`(${acceptedFileTypes.split(",").join("|")})$`, "i"))
    );
    
    if (invalidFiles.length > 0) {
      toast.error(`Invalid file type. Please upload ${acceptedFileTypes} files.`);
      return;
    }

    // Check file count
    if (files.length + newFiles.length > maxFiles) {
      toast.error(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
    toast.success(`${newFiles.length} ${newFiles.length === 1 ? 'file' : 'files'} uploaded successfully!`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging 
            ? "border-hirenova-500 bg-hirenova-50" 
            : "border-gray-300 hover:border-hirenova-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <Upload 
            className={`w-10 h-10 ${isDragging ? "text-hirenova-500" : "text-gray-400"}`} 
          />
          <p className="text-sm text-gray-600 text-center">{description}</p>
          <p className="text-xs text-gray-500">
            Accepted file types: {acceptedFileTypes.replace(/\./g, "").toUpperCase()}
          </p>
          
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              className="mt-2"
              onClick={openFileDialog}
            >
              Browse Files
            </Button>
            
            {files.length > 0 && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                className="mt-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  setFiles([]);
                  onFilesChange([]);
                }}
              >
                Clear All
              </Button>
            )}
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={acceptedFileTypes}
            multiple={maxFiles > 1}
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">
            {files.length} {files.length === 1 ? "file" : "files"} selected
          </p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-hirenova-500" />
                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                </div>
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
