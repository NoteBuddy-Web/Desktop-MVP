import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, Eye, EyeOff, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { openaiService } from '@/services/openai';

interface ApiKeySetupProps {
  onApiKeySet: () => void;
}

export const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      openaiService.setApiKey(apiKey.trim());
      const isValid = await openaiService.testConnection();
      
      if (isValid) {
        setStatus('success');
        setTimeout(() => {
          onApiKeySet();
        }, 1000);
      } else {
        setStatus('error');
        setErrorMessage('Invalid API key or connection failed');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to connect to OpenAI');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Setup API Key</CardTitle>
          <CardDescription>
            Enter your API key to enable AI-powered conversations
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <div className="relative">
                <Input
                  type={showKey ? 'text' : 'password'}
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {status === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {status === 'success' && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  API key is valid! Setting up your chat...
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!apiKey.trim() || isLoading}
            >
              {isLoading ? 'Testing Connection...' : 'Connect to OpenAI'}
            </Button>
          </form>

          <div className="space-y-3 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">Don't have an API key?</p>
              <p className="text-xs mb-2">
                Get your OpenAI API key from the OpenAI platform:
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open('https://platform.openai.com/api-keys', '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-2" />
                Get API Key
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Note:</strong> Your API key is stored locally and never shared.</p>
              <p>You'll be charged based on OpenAI's usage rates.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
