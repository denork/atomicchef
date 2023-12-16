import { FormData } from "@/types/types"

export function generatePrompt(values: FormData): string {
  return `You are an expert culinary chef. Create a meal recipe by strictly following these rules:

  Rules:
- The recipe must have a list of instructions;
- Diet:
    - Low-calori: ${values.low_calori} ;
    - Vegan: ${values.vegan} ;
    - Paleo: ${values.paleo} ;
- Ingredients available: ${values.ingredients} . Do not use ingredients that are incompatible with diet euqual to true;
- Cooking time: less than ${values.cooking_time} minutes;
- The recipe must be for ${values.people} people;
- Difficulty of execution: ${values.difficulty} ;
    
Example with ingredients: Cheese, Avocado, Pepper:

Cheese and Avocado Sandwich

Preparation Time: 10 min

Difficulty: intermediate

Ingredients:
- 100 grams Cheese
- 2 pieces Bread
- 1 pieces Avocado
- 20 grams Butter
- 1 pieces Spicy Pepper

Kitchen Tools Needed:
- knife
- cutting board
- toaster

Instructions:
- Toast the bread slices in a toaster.
- Spread butter on one side of each bread slice.
- Slice the avocado and the spicy pepper.
- Grate the cheese.
- Layer the avocado, spicy pepper, and cheese on one bread slice.
- Cover with the other bread slice.
- Cut the sandwich diagonally.
- Serve and enjoy!

Macros:
- Total Calories: 350kcal
- Carbs: 30grams
- Proteins: 15grams
- Fats: 20grams
`
}
