import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Calendar, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg" />
            <span className="text-xl font-bold text-foreground">SocialSync</span>
          </div>
          <Button onClick={() => navigate("/auth")} variant="outline">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
            Social Media Automation
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Schedule posts across
            <span className="bg-gradient-hero bg-clip-text text-transparent"> all platforms</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your social accounts once. Schedule and publish content to Facebook, Instagram, Twitter, LinkedIn, and TikTok from one beautiful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/auth")} 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate("/auth")} 
              size="lg"
              variant="outline"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Everything you need to automate social media
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Multi-Platform Publishing</h3>
              <p className="text-muted-foreground">
                Connect all your social accounts and publish to multiple platforms with a single click.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Smart Scheduling</h3>
              <p className="text-muted-foreground">
                Schedule posts in advance and let our automation handle the publishing at optimal times.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track performance across all your social accounts with detailed analytics and reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto text-center bg-gradient-hero rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to streamline your social media?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of creators and businesses automating their social media presence.
          </p>
          <Button 
            onClick={() => navigate("/auth")} 
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground text-sm">
            © 2025 SocialSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
