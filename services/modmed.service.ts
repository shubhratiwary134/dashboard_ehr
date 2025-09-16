import axios from "axios";

// Create a pre-configured axios instance for ModMed API
const modmedApi = axios.create({
  baseURL: process.env.MODMED_BASE_URL,
  auth: {
    username: process.env.MODMED_USERNAME || "",
    password: process.env.MODMED_PASSWORD || "",
  },
  headers: {
    "x-api-key": process.env.MODMED_API_KEY || "",
  },
});

// Export function to get ModMed patients
export async function getModMedPatients() {
  try {
    const firmPrefix = process.env.MODMED_FIRM_PREFIX || "";
    const response = await modmedApi.get(`${firmPrefix}/api/v1/patients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ModMed patients:", error);
    throw new Error("Failed to fetch ModMed patients");
  }
}
