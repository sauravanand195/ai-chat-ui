import { z } from "zod";

export const ProjectPlanSchema = z.object({
    title: z.string(),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
    estimatedTime: z.string(),
    summary: z.string(),
    tools: z.array(z.string()),
    steps: z.array(z.string()),
    risks: z.array(z.string()),
});

export type ProjectPlan = z.infer<typeof ProjectPlanSchema>;