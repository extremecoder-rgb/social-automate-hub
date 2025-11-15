import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Image as ImageIcon, Loader2 } from "lucide-react";

interface PostComposerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostComposer = ({ open, onOpenChange }: PostComposerProps) => {
  const [caption, setCaption] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const availablePlatforms = [
    { id: "facebook", name: "Facebook" },
    { id: "instagram", name: "Instagram" },
    { id: "twitter", name: "Twitter/X" },
    { id: "linkedin", name: "LinkedIn" },
    { id: "tiktok", name: "TikTok" },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async () => {
    if (!caption.trim()) {
      toast.error("Please enter a caption");
      return;
    }

    if (platforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("posts").insert({
        user_id: user.id,
        content: { caption, media: [] },
        platforms,
        status: "draft",
      });

      if (error) throw error;

      toast.success("Post created successfully!");
      setCaption("");
      setPlatforms([]);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Compose your post and select platforms to publish
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          {/* Media Upload (Placeholder) */}
          <div className="space-y-2">
            <Label>Media</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Media upload coming soon
              </p>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-2">
            <Label>Select Platforms</Label>
            <div className="grid grid-cols-2 gap-3">
              {availablePlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={platform.id}
                    checked={platforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                  <label
                    htmlFor={platform.id}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {platform.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule (Placeholder) */}
          <div className="space-y-2">
            <Label>Schedule</Label>
            <Button variant="outline" className="w-full justify-start gap-2" disabled>
              <Calendar className="h-4 w-4" />
              Schedule for later (Coming soon)
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Post
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostComposer;
