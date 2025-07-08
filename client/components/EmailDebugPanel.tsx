import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmailService } from "@/services/emailService";
import { Mail, Trash2, RefreshCw } from "lucide-react";

export default function EmailDebugPanel() {
  const [emails, setEmails] = useState<
    Array<{
      from: string;
      to: string;
      subject: string;
      body: string;
      timestamp: string;
      attachmentCount?: number;
    }>
  >([]);
  const [isVisible, setIsVisible] = useState(false);

  const refreshEmails = () => {
    setEmails(EmailService.getSentEmails());
  };

  const clearEmails = () => {
    EmailService.clearSentEmails();
    setEmails([]);
  };

  useEffect(() => {
    refreshEmails();
    const interval = setInterval(refreshEmails, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Only show in development
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost"
  ) {
    return null;
  }

  if (!isVisible) {
    return (
      <Button
        className="fixed bottom-4 left-4 z-50"
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
      >
        <Mail className="h-4 w-4 mr-2" />
        Email Debug ({emails.length})
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 max-h-96 overflow-y-auto">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Debug Panel
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={refreshEmails}>
                <RefreshCw className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={clearEmails}>
                <Trash2 className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsVisible(false)}
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {emails.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No emails sent yet
            </p>
          ) : (
            emails
              .slice(-5)
              .reverse()
              .map((email, index) => (
                <div key={index} className="border rounded p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {email.subject.split(" - ")[0]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(email.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-xs">
                    <div>
                      <strong>To:</strong> {email.to}
                    </div>
                    <div>
                      <strong>Subject:</strong> {email.subject}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground max-h-16 overflow-y-auto">
                    {email.body.substring(0, 150)}...
                  </div>
                  {email.attachmentCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {email.attachmentCount} attachment(s)
                    </Badge>
                  )}
                </div>
              ))
          )}
          <div className="text-xs text-muted-foreground text-center pt-2">
            Total: {emails.length} emails sent
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
