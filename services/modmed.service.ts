import axios from "axios";

// In-memory variable to store the access token
let accessToken: string | null = null;

// Create a basic axios instance for ModMed API
const modmedApi = axios.create({
  baseURL: process.env.MODMED_BASE_URL,
});

// Function to authenticate and get OAuth 2.0 token
export async function authenticateModMed() {
  try {
    const response = await modmedApi.post("/oauth/token", {
      api_key: process.env.MODMED_API_KEY,
      username: process.env.MODMED_USERNAME,
      password: process.env.MODMED_PASSWORD,
    });

    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Error authenticating with ModMed:", error);
    throw new Error("Failed to authenticate with ModMed");
  }
}

// Export function to get ModMed patients
export async function getModMedPatients() {
  try {
    // Ensure we have a valid token
    if (!accessToken) {
      await authenticateModMed();
    }

    const firmPrefix = process.env.MODMED_FIRM_PREFIX || "";
    const response = await modmedApi.get(`${firmPrefix}/api/v1/patients`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ModMed patients:", error);
    throw new Error("Failed to fetch ModMed patients");
  }
}
