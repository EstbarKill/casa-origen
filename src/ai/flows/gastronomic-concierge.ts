'use server';
/**
 * @fileOverview A Genkit flow for a gastronomic AI concierge that suggests personalized food and beverage pairings.
 *
 * - gastronomicConcierge - A function that provides food and beverage pairing suggestions.
 * - GastronomicConciergeInput - The input type for the gastronomicConcierge function.
 * - GastronomicConciergeOutput - The return type for the gastronomicConcierge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GastronomicConciergeInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      "User's food and beverage preferences, e.g., 'likes spicy food', 'prefers white wine', 'vegetarian'."
    ),
  userAllergies: z
    .string()
    .describe(
      "List of user's allergies, e.g., 'shellfish', 'nuts', 'dairy'. Leave empty if none."
    ),
  diningOccasion: z
    .string()
    .optional()
    .describe(
      "The occasion for dining, e.g., 'romantic dinner', 'casual lunch', 'celebration'."
    ),
});
export type GastronomicConciergeInput = z.infer<typeof GastronomicConciergeInputSchema>;

const GastronomicConciergeOutputSchema = z.object({
  foodSuggestion: z.object({
    name: z.string().describe('The name of the suggested dish.'),
    description: z
      .string()
      .describe('A brief description of the suggested dish.'),
  }),
  beverageSuggestion: z.object({
    name: z.string().describe('The name of the suggested beverage.'),
    description: z
      .string()
      .describe('A brief description of the suggested beverage.'),
  }),
  pairingRationale: z
    .string()
    .describe(
      'An explanation of why the suggested food and beverage pair well, considering user preferences, allergies, and local flavors.'
    ),
});
export type GastronomicConciergeOutput = z.infer<typeof GastronomicConciergeOutputSchema>;

export async function gastronomicConcierge(
  input: GastronomicConciergeInput
): Promise<GastronomicConciergeOutput> {
  return gastronomicConciergeFlow(input);
}

const gastronomicConciergePrompt = ai.definePrompt({
  name: 'gastronomicConciergePrompt',
  input: {schema: GastronomicConciergeInputSchema},
  output: {schema: GastronomicConciergeOutputSchema},
  prompt: `You are an expert gastronomic concierge for Casa Origen, a beachfront restaurant and bar in Ciénaga, Magdalena, Colombia.
Casa Origen is inspired by the vibrant culture of the Ciénaga Caiman and the rich flavors of the Colombian Caribbean.
Our cuisine focuses on fresh seafood, tropical fruits, local spices, plantains, and coconut-based dishes, blended with Mediterranean aesthetics.

Your task is to suggest a personalized food and beverage pairing for a customer based on their preferences, allergies, and the local Ciénaga/Caribbean flavors.

User Preferences: {{{userPreferences}}}
User Allergies: {{{userAllergies}}}
{{#if diningOccasion}}
Dining Occasion: {{{diningOccasion}}}
{{/if}}

Considering all the information, recommend one food item and one beverage that perfectly complement each other and the dining experience at Casa Origen.
Ensure the suggestions are suitable given the user's allergies and preferences, and highlight how they embody the local flavors and the restaurant's essence.`,
});

const gastronomicConciergeFlow = ai.defineFlow(
  {
    name: 'gastronomicConciergeFlow',
    inputSchema: GastronomicConciergeInputSchema,
    outputSchema: GastronomicConciergeOutputSchema,
  },
  async input => {
    const {output} = await gastronomicConciergePrompt(input);
    if (!output) {
      throw new Error('No output received from the gastronomic concierge prompt.');
    }
    return output;
  }
);
