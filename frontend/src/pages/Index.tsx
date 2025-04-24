import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileUp, MessageSquare, Sparkles, Youtube, File, Map } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ParticlesBackground from '@/components/ParticlesBackground';
import Header from '@/components/Header';

const Index: React.FC = () => {
  const features = [
    {
      icon: <FileUp className="h-8 w-8 text-wizard-primary mb-4" />,
      title: "Drag & Drop Files",
      description: "Upload your documents with a simple drag and drop interface. Support for PDFs, TXT, MD, CSV, PPT and DOC files."
    },
    {
      icon: <Youtube className="h-8 w-8 text-wizard-primary mb-4" />,
      title: "YouTube Integration",
      description: "Import content directly from YouTube videos as knowledge sources for your AI chat experience."
    },
    {
      icon: <Map className="h-8 w-8 text-wizard-primary mb-4" />,
      title: "Mind Map Generation",
      description: "Visualize concepts and relationships within your documents with AI-powered mind maps."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-wizard-primary mb-4" />,
      title: "Conversational AI",
      description: "Chat naturally with an AI that understands your documents and responds with insightful answers."
    },
    {
      icon: <File className="h-8 w-8 text-wizard-primary mb-4" />,
      title: "Presentation Support",
      description: "Extract and analyze content from PowerPoint and Word documents for comprehensive insights."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-wizard-primary mb-4" />,
      title: "Magical Experience",
      description: "A beautifully designed interface with magical animations and responsive design for all devices."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <ParticlesBackground />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 flex items-center">
          <div className="container px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="wizard-gradient-text">Turn Your Notes into </span> a Study Buddy!
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Got a mountain of PDFs and class notes? Just upload them and let our AI wizard work its magic! Ask anything and get quick, smart answers straight from your own study material. Studying has never been this fun (or this easy)!                
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="wizard-button py-6 px-8 text-lg">
                  <Link to="/chat">
                  Let’s Get Studying! 🎓✨ <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="pt-8">
                <div className="relative">
                  <div className="wizard-card floating max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-wizard-primary/30">
                    <div className="aspect-video bg-wizard-dark-gradient rounded-t-2xl p-4 flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="h-16 w-16 text-wizard-primary mx-auto mb-4" />
                        <h3 className="text-xl font-medium wizard-gradient-text">Wizard Chat Interface</h3>
                        <p className="text-muted-foreground mt-2">Upload files and start chatting</p>
                      </div>
                    </div>
                    <div className="p-6 bg-card/80">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-2.5 w-2.5 rounded-full bg-wizard-primary"></div>
                        <div className="h-2 w-32 bg-wizard-primary/30 rounded-full"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-wizard-primary/20 rounded-full"></div>
                        <div className="h-4 w-3/4 bg-wizard-primary/20 rounded-full"></div>
                        <div className="h-4 w-5/6 bg-wizard-primary/20 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-wizard-gradient rounded-full opacity-40 blur-xl"></div>
                  <div className="absolute -top-6 -left-6 h-24 w-24 bg-wizard-gradient rounded-full opacity-40 blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 glass-morphism">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Magical Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the enchanted capabilities of our AI-powered chat interface.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.slice(0, 6).map((feature, index) => (
                <div key={index} className="wizard-card hover:-translate-y-1 transition-transform">
                  <div className="text-center">
                    {feature.icon}
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Mind Map Demo Section */}
        <section className="py-20">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Visualize Knowledge with Mind Maps</h2>
                  <p className="text-muted-foreground">
                    Convert complex documents and ideas into clear, visual mind maps. Understand relationships between concepts and extract key insights from your content.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/chat">
                      Try Mind Mapping <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <div className="wizard-card p-4">
                    <div className="bg-wizard-primary/10 rounded-lg p-6 aspect-square flex items-center justify-center">
                      <Map className="h-20 w-20 text-wizard-primary opacity-70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* YouTube Integration Section */}
        <section className="py-20 bg-wizard-dark-gradient">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/2 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Learn from YouTube Videos</h2>
                  <p className="text-gray-300">
                    Import knowledge directly from YouTube videos. Our AI processes video content and makes it available for chat interactions and knowledge retrieval.
                  </p>
                  <Button asChild className="wizard-button mt-2">
                    <Link to="/chat">
                      Try YouTube Import <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="relative aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black/40">
                      <Youtube className="h-16 w-16 text-red-500" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <div className="h-2 w-full bg-wizard-primary/30 rounded-full">
                          <div className="h-2 w-1/3 bg-wizard-primary rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="container px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Magic?</h2>
              <p className="text-muted-foreground mb-8">
                Upload your documents, import YouTube videos, and start chatting with our AI wizard today.
              </p>
              <Button asChild className="wizard-button py-6 px-8 text-lg">
                <Link to="/chat">
                  Start Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 border-t border-wizard-primary/20">
        <div className="container px-4 md:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Wizard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
