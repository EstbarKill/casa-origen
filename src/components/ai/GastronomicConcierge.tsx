
"use client";

import { useState } from 'react';
import { gastronomicConcierge, type GastronomicConciergeOutput } from '@/ai/flows/gastronomic-concierge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles, Utensils, GlassWater } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function GastronomicConcierge() {
  const [preferences, setPreferences] = useState('');
  const [allergies, setAllergies] = useState('');
  const [occasion, setOccasion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GastronomicConciergeOutput | null>(null);
  const { toast } = useToast();

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const output = await gastronomicConcierge({
        userPreferences: preferences,
        userAllergies: allergies,
        diningOccasion: occasion || undefined,
      });
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Selection Error',
        description: 'Failed to generate recommendations. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/50 backdrop-blur border-primary/20 shadow-xl overflow-hidden">
      <CardContent className="p-8">
        <form onSubmit={handleSuggest} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="preferences">Preferences</Label>
            <Input 
              id="preferences" 
              placeholder="e.g. Spicy food, seafood, sweet" 
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              required
              className="bg-white border-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Input 
              id="allergies" 
              placeholder="e.g. Shellfish, nuts (leave empty if none)" 
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="bg-white border-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Input 
              id="occasion" 
              placeholder="e.g. Birthday, romantic" 
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="bg-white border-muted"
            />
          </div>
          <div className="md:col-span-3">
            <Button 
              type="submit" 
              disabled={isLoading || !preferences}
              className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating your pairing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Pairing Suggestions
                </>
              )}
            </Button>
          </div>
        </form>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-primary/10 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Utensils size={20} />
                  <span>Main Dish</span>
                </div>
                <h3 className="text-2xl font-headline font-bold">{result.foodSuggestion.name}</h3>
                <p className="text-foreground/80">{result.foodSuggestion.description}</p>
              </div>
              <div className="bg-accent/10 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-accent font-bold">
                  <GlassWater size={20} />
                  <span>Perfect Drink</span>
                </div>
                <h3 className="text-2xl font-headline font-bold">{result.beverageSuggestion.name}</h3>
                <p className="text-foreground/80">{result.beverageSuggestion.description}</p>
              </div>
            </div>
            <div className="border-t pt-6">
              <h4 className="font-bold mb-2">Why this works:</h4>
              <p className="text-foreground/70 italic leading-relaxed">
                "{result.pairingRationale}"
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
