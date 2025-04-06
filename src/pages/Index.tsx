
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Users, PieChart, CheckCircle, BarChart, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="w-12 h-12 text-hirenova-600" />,
      title: "Smart JD Parsing",
      description: "Upload job descriptions and let our AI extract key requirements and skills.",
    },
    {
      icon: <Users className="w-12 h-12 text-hirenova-600" />,
      title: "Resume Analysis",
      description: "Upload multiple resumes at once and get structured candidate profiles.",
    },
    {
      icon: <BarChart className="w-12 h-12 text-hirenova-600" />,
      title: "AI Matching",
      description: "Our advanced algorithms match candidates to jobs based on skills and experience.",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-hirenova-600" />,
      title: "Shortlist Generation",
      description: "Automatically generate a shortlist of top candidates for interviews.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-hirenova-800 to-hirenova-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
                AI-Powered <span className="text-hirenova-200">Candidate Screening</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl animate-slide-in">
                Find the perfect match for your job openings with our advanced AI technology that analyzes resumes and job descriptions.
              </p>
              <div className="mt-8 space-x-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Button size="lg" onClick={() => navigate("/upload")}>
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="AI Recruitment" 
                className="rounded-lg shadow-xl max-w-md w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How HireNova Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your hiring process with our powerful AI tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 card-shadow card-gradient"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple 3-Step Process</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and find your ideal candidates quickly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-hirenova-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-hirenova-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Upload Job Description</h3>
              <p className="text-gray-600">
                Upload your job description document and our AI will extract key requirements.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-hirenova-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-hirenova-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Upload Resumes</h3>
              <p className="text-gray-600">
                Upload multiple candidate resumes at once for batch processing.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-hirenova-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-hirenova-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Review Matches</h3>
              <p className="text-gray-600">
                Get AI-generated match scores and shortlist the best candidates.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate("/upload")}>
              Start Matching Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hirenova-800 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Hiring Process?</h2>
            <p className="mt-4 text-xl text-gray-200">
              Join thousands of companies using HireNova to find the perfect candidates faster.
            </p>
            <Button 
              className="mt-8 bg-white text-hirenova-800 hover:bg-gray-100" 
              size="lg"
              onClick={() => navigate("/upload")}
            >
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
