const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface SymptomCheckResponse {
  specialty: string;
}

export async function symptomCheck(
  symptoms: string,
): Promise<SymptomCheckResponse> {
  const response = await fetch(`${API_BASE_URL}/api/ai/symptom-check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symptoms }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.error?.message ||
      "Something went wrong while contacting the AI service.";

    throw new Error(message);
  }

  if (!data || typeof data.specialty !== "string") {
    throw new Error("Unexpected response from AI service.");
  }

  return data as SymptomCheckResponse;
}

