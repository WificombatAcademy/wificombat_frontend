import { z } from 'zod';

export const FormDataSchema = z.object({
  name: z.string().min(1, "Name is required"),

  age: z.enum([
    '6-8 years old',
     '9-12 years old',
     '13-15 years old',
     '16-18 years old',
  ]),

  gender: z.enum([
    'Male', 
    'Female', 
    'Prefer not to say']),

  activities:
    z.enum([
        'Playing games on a tablet or computer', 
        'Drawing pictures or coloring', 
        'Building with blocks or LEGOs', 
        'Solving simple puzzles']),

  gamePreference: z.enum([
    'Run and Jump', 
    'Find hidden things', 
    'Talk to characters', 
    'Make things happen']),

  toyAction: z.enum([
    'Make it move',
     'Make it talk',
     'Make it change colour',
     'Make it count']),

  drawingPreference: z.enum([
    'Make things look pretty',
     'Tell a story',
     'Make funny characters',
     'Create something new']),

  robotTask: z.enum([
    'Play with you',
     'Help you with chores',
     'Talk to you',
     'Look cool']),
});
