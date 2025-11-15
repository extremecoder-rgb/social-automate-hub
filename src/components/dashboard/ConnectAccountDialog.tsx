import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Twitter, Linkedin, AlertCircle } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface ConnectAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  status: "available" | "requires_setup" | "coming_soon";
  requirements?: string[];
  color: string;
}

const ConnectAccountDialog = ({ open, onOpenChange }: ConnectAccountDialogProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  const platforms: Platform[] = [
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook className="h-6 w-6" />,
      description: "Connect your Facebook Pages to publish posts and manage content",
      status: "requires_setup",
      requirements: [
        "Facebook Developer App registration",
        "OAuth Client ID and Secret",
        "pages_manage_posts and pages_read_engagement permissions",
      ],
      color: "bg-[#1877f2]",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="h-6 w-6" />,
      description: "Connect Instagram Business or Creator accounts",
      status: "requires_setup",
      requirements: [
        "Instagram Business/Creator account",
        "Connected to a Facebook Page",
        "Facebook App with Instagram Graph API access",
        "instagram_graph_user_profile and instagram_content_publish scopes",
      ],
      color: "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
    },
    {
      id: "twitter",
      name: "Twitter / X",
      icon: <Twitter className="h-6 w-6" />,
      description: "Publish tweets and manage your X presence",
      status: "requires_setup",
      requirements: [
        "X Developer Portal app registration",
        "API access (Note: Posting requires paid API tier)",
        "OAuth 2.0 credentials",
        "tweet.read and tweet.write scopes",
      ],
      color: "bg-[#000000]",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6" />,
      description: "Share professional content on your LinkedIn profile or company page",
      status: "requires_setup",
      requirements: [
        "LinkedIn Developer App",
        "OAuth 2.0 Client ID and Secret",
        "w_member_social scope for posting",
      ],
      color: "bg-[#0a66c2]",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: <TikTokIcon className="h-6 w-6" />,
      description: "Upload and schedule TikTok videos",
      status: "requires_setup",
      requirements: [
        "TikTok for Developers app",
        "App review approval required",
        "Content Posting API access",
        "Note: Publishing APIs are limited and require approval",
      ],
      color: "bg-[#000000]",
    },
  ];

  const handleConnect = (platform: Platform) => {
    setSelectedPlatform(platform);
  };

  const handleConfirmConnect = () => {
    // This will be implemented with actual OAuth flow
    // For now, show a message about setup requirements
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Connect Social Media Account</DialogTitle>
          <DialogDescription>
            Choose a platform to connect. OAuth setup is required for each platform.
          </DialogDescription>
        </DialogHeader>

        {!selectedPlatform ? (
          <div className="grid md:grid-cols-2 gap-4 py-4">
            {platforms.map((platform) => (
              <Card
                key={platform.id}
                className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-md"
                onClick={() => handleConnect(platform)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center text-white`}>
                      {platform.icon}
                    </div>
                    {platform.status === "requires_setup" && (
                      <Badge variant="outline" className="text-xs">
                        Setup Required
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-lg ${selectedPlatform.color} flex items-center justify-center text-white`}>
                {selectedPlatform.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedPlatform.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedPlatform.description}</p>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>OAuth Configuration Required</AlertTitle>
              <AlertDescription>
                To connect {selectedPlatform.name}, you need to set up OAuth credentials first.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Setup Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedPlatform.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Alert className="bg-muted">
              <AlertDescription className="text-sm">
                <strong>Next Steps:</strong>
                <ol className="mt-2 space-y-1 list-decimal list-inside">
                  <li>Register a developer app with {selectedPlatform.name}</li>
                  <li>Configure OAuth redirect URLs in your app settings</li>
                  <li>Add your OAuth credentials to the platform settings</li>
                  <li>Return here to complete the connection</li>
                </ol>
              </AlertDescription>
            </Alert>

            <div className="flex gap-2 justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setSelectedPlatform(null)}
              >
                Back to Platforms
              </Button>
              <Button
                onClick={handleConfirmConnect}
                disabled
                className="gap-2"
              >
                Connect {selectedPlatform.name}
                <span className="text-xs">(OAuth Setup Required)</span>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAccountDialog;
