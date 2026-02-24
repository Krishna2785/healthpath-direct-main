import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { symptomCheck } from "@/lib/aiClient";

export function useSymptomCheck() {
  return useMutation({
    mutationKey: ["symptom-check"],
    mutationFn: (symptoms: string) => symptomCheck(symptoms),
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to contact AI symptom checker.";

      toast({
        title: "AI assistant error",
        description: message,
        variant: "destructive",
      });
    },
  });
}

