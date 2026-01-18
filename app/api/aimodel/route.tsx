import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details, in order, and wait for the user's answer before asking the next:

1. Starting location (source) - ui: null (no special UI)
2. Destination city or country - ui: null (no special UI)
3. Group size (Solo, Couple, Family, Friends) - ui: "groupSize"
4. Budget (Low, Medium, High) - ui: "budget"
5. Trip duration (number of days) - ui: "tripDuration"
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) - ui: null (no special UI)
7. Once all info is collected - ui: "final"

IMPORTANT RULES FOR UI SELECTION:
- The "ui" field indicates which UI component to show BASED ON THE QUESTION YOU ARE CURRENTLY ASKING.
- When you are ASKING about group size, set ui to "groupSize"
- When you are ASKING about budget (AFTER user has answered group size), set ui to "budget"
- When you are ASKING about trip duration (AFTER user has answered budget), set ui to "tripDuration"
- When all required info is collected and you are ready to generate the plan, set ui to "final"
- For all other questions (source, destination, interests), set ui to null

CRITICAL RULE - WHEN ALL INFO IS COLLECTED:
- DO NOT generate the actual trip plan or itinerary yourself!
- Just provide a SHORT confirmation message like "Great! I have all the details. Click below to generate your personalized trip plan!"
- Set ui to "final" - the system will handle generating the detailed plan
- Keep your response brief (1-2 sentences max)

Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

Generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:
{
  "resp": "Your question or response text here",
  "ui": "groupSize" | "budget" | "tripDuration" | "final" | null
}

`;

const FINAL_PROMPT = `
Generate Travel Plan with give details, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itinerary with placename, Place Details, Place Image Url, Geo Coordinates, Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON Format
Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;




export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "xiaomi/mimo-v2-flash:free",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: isFinal ? FINAL_PROMPT : PROMPT,
        },
        ...messages,
      ],
    });
    console.log(completion.choices[0].message);
    const message = completion.choices[0].message;
    return NextResponse.json(JSON.parse(message.content ?? ""));
  } catch (e) {
    return NextResponse.json(e);
  }
}
