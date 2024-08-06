import { z } from 'zod';

export const FormDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.enum(['6-8', '9-12', '13-15', '16-18']),
  gender: z.enum(['Male', 'Female', 'Prefer not to say']),
  activities: z.array(
    z.enum(['Playing games on a tablet or computer', 
        'Drawing pictures or coloring', 
        'Building with blocks or LEGOs', 
        'Solving simple puzzles'])
  ).min(1, "Select at least one activity").max(4, "Select up to four activities"),
  gamePreference: z.enum(['Run and Jump', 'Find hidden things', 'Talk to characters', 'Make things happen']),
  toyAction: z.enum(['Make it move', 'Make it talk', 'Make it change colour', 'Make it count']),
  drawingPreference: z.enum(['Make things look pretty', 'Tell a story', 'Make funny characters', 'Create something new']),
  robotTask: z.enum(['Play with me', 'Help you with chores', 'Talk to you', 'Look cool']),
});
