const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeComplaint = async ({ title, description }) => {

  const prompt = `
You are the AI complaint analysis system for HostelConnect,
a hostel grievance management platform.

Analyze the student's complaint carefully.

ALLOWED CATEGORIES:
- plumbing
- electrical
- cleanliness
- food
- maintenance
- security
- harassment
- ragging
- noise
- accommodation
- internet
- other

ALLOWED PRIORITIES:
- low
- medium
- high
- critical

SENSITIVE COMPLAINTS:

A complaint should be marked sensitive if it involves:
- harassment
- ragging
- threats
- personal grievances
- safety issues
- intimidation
- abuse

PRIORITY GUIDELINES:

CRITICAL:
- Immediate safety threat
- Serious harassment or ragging
- Threats
- Major electrical danger
- Fire
- Serious security issue
- No access to essential drinking water

HIGH:
- Major water leakage
- Major sanitation problem
- Electricity failure
- Broken essential facilities
- Significant security problem

MEDIUM:
- Fan not working
- Light not working
- Minor plumbing problem
- Furniture damage
- Internet problem

LOW:
- Minor cleanliness issue
- Cosmetic problem
- General suggestion
- Non-urgent request

RULES:

1. Do not infer the student's identity.
2. Do not generate personal information.
3. Do not expose personal information.
4. Do not make assumptions that are not supported by the complaint.
5. Keep the summary short and factual.
6. Set sensitive=true when the complaint involves a sensitive matter.
7. Priority should reflect urgency, safety and potential harm.
8. Use only the allowed categories.
9. Use only the allowed priorities.

STUDENT COMPLAINT:

Title:
${title || ""}

Description:
${description || ""}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          category: {
            type: "string",
            enum: [
              "plumbing",
              "electrical",
              "cleanliness",
              "food",
              "maintenance",
              "security",
              "harassment",
              "ragging",
              "noise",
              "accommodation",
              "internet",
              "other",
            ],
          },

          priority: {
            type: "string",
            enum: [
              "low",
              "medium",
              "high",
              "critical",
            ],
          },

          summary: {
            type: "string",
          },

          sensitive: {
            type: "boolean",
          },
        },

        required: [
          "category",
          "priority",
          "summary",
          "sensitive",
        ],
      },
    },
  });

  let result;

  try {
    result = JSON.parse(response.text);
  } catch (error) {

    console.error("Raw Gemini response:", response.text);

    throw new Error("Gemini returned invalid JSON");
  }

  return result;
};

module.exports = {
  analyzeComplaint,
};