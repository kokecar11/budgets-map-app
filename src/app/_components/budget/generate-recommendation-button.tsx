"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { BrainCircuit, Loader2 } from "lucide-react";

export function GenerateRecommendationAiButton({
  type_budget,
  onRecommendationGenerated,
}: {
  type_budget: string;
  onRecommendationGenerated?: (recommendation: string) => void;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const { mutate: generateRecommendation } =
    api.ai.generateRecommendation.useMutation({
      onMutate: () => {
        setIsGenerating(true);
      },
      onSuccess: (data) => {
        setRecommendation(data.recommendations);
        if (onRecommendationGenerated) {
          onRecommendationGenerated(data.recommendations);
        }
        setIsGenerating(false);
      },
      onError: (error) => {
        console.error("Error generating recommendation:", error);
        setIsGenerating(false);
      },
    });

  const handleGenerateRecommendation = () => {
    generateRecommendation({ type_budget });
  };

  return (
    <Button
      onClick={handleGenerateRecommendation}
      disabled={isGenerating}
      size="sm"
      variant="default"
      className="flex w-full items-center gap-1"
    >
      {isGenerating ? (
        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
      ) : (
        <BrainCircuit className="mr-1 h-4 w-4" />
      )}
      {isGenerating ? "Generating..." : "Generate Recommendation"}
    </Button>
  );
}
