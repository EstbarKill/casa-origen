'use server';
/**
 * @fileOverview A Genkit flow for generating elegant and enticing menu item descriptions for Casa Origen.
 *
 * - generateMenuDescription - A function that generates a description for a menu item.
 * - GenerateMenuDescriptionInput - The input type for the generateMenuDescription function.
 * - GenerateMenuDescriptionOutput - The return type for the generateMenuDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMenuDescriptionInputSchema = z.object({
  itemName: z.string().describe('The name of the menu item.'),
  keyIngredients: z
    .string()
    .describe('A comma-separated list of key ingredients in the menu item.'),
  concept: z
    .string()
    .describe('A brief concept or inspiration for the menu item.'),
});
export type GenerateMenuDescriptionInput = z.infer<
  typeof GenerateMenuDescriptionInputSchema
>;

const GenerateMenuDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe(
      'An elegant and enticing description for the menu item, reflecting Casa Origen\'s brand and local flavors.'
    ),
});
export type GenerateMenuDescriptionOutput = z.infer<
  typeof GenerateMenuDescriptionOutputSchema
>;

const menuDescriptionPrompt = ai.definePrompt({
  name: 'menuDescriptionPrompt',
  input: {schema: GenerateMenuDescriptionInputSchema},
  output: {schema: GenerateMenuDescriptionOutputSchema},
  prompt: `You are a sophisticated menu copywriter for Casa Origen, a beachfront restaurant and bar in Ciénaga, Magdalena. Your task is to craft elegant, enticing, and captivating descriptions for menu items.

Your descriptions must:
- Reflect Casa Origen's brand: coastal elegance, Ciénaga culture, gastronomic experience by the sea.
- Highlight local Ciénaga/Caribbean flavors and traditions.
- Be concise yet evocative.
- Appeal to discerning diners.

Generate a description for the following menu item:

Menu Item Name: {{{itemName}}}
Key Ingredients: {{{keyIngredients}}}
Concept: {{{concept}}}

Description:`,
});

const generateMenuDescriptionFlow = ai.defineFlow(
  {
    name: 'generateMenuDescriptionFlow',
    inputSchema: GenerateMenuDescriptionInputSchema,
    outputSchema: GenerateMenuDescriptionOutputSchema,
  },
  async input => {
    const {output} = await menuDescriptionPrompt(input);
    return output!;
  }
);

export async function generateMenuDescription(
  input: GenerateMenuDescriptionInput
): Promise<GenerateMenuDescriptionOutput> {
  return generateMenuDescriptionFlow(input);
}
