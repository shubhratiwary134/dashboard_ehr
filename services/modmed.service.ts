import axios from "axios";

let accessToken: string | null = null;

const modmedApi = axios.create({
  baseURL: process.env.MODMED_BASE_URL,
});

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

export async function getModMedPatients() {
  try {
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

export async function searchModMedPatients(params: Record<string, any>) {
  try {
    if (!accessToken) {
      await authenticateModMed();
    }

    const firmPrefix = process.env.MODMED_FIRM_PREFIX || "";
    const response = await modmedApi.get(`${firmPrefix}/api/v1/patients`, {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching ModMed patients:", error);
    throw new Error("Failed to search ModMed patients");
  }
}

export async function getModMedPatientById(patientId: string) {
  try {
    if (!accessToken) {
      await authenticateModMed();
    }

    const firmPrefix = process.env.MODMED_FIRM_PREFIX || "";
    const response = await modmedApi.get(
      `${firmPrefix}/api/v1/patients/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ModMed patient by ID:", error);
    throw new Error("Failed to fetch ModMed patient");
  }
}

export async function updateModMedPatient(patientId: string, patientData: any) {
  try {
    if (!accessToken) {
      await authenticateModMed();
    }

    const firmPrefix = process.env.MODMED_FIRM_PREFIX || "";
    const response = await modmedApi.put(
      `${firmPrefix}/api/v1/patients/${patientId}`,
      patientData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating ModMed patient:", error);
    throw new Error("Failed to update ModMed patient");
  }
}

export async function getPatientAllergies(patientId: string) {
  try {
    if (!accessToken) {
      await authenticateModMed();
    }

    const firmPrefix = process.env.MODMED_FIRM_PREFIX || "";
    const response = await modmedApi.get(
      `${firmPrefix}/api/v1/patients/${patientId}/allergies`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching patient allergies:", error);
    throw new Error("Failed to fetch patient allergies");
  }
}

export async function updatePatientAllergies(
  patientId: string,
  allergyData: any
) {
  try {
    if (!accessToken) {
      await authenticateModMed();
    }

    const firmPrefix = process.env.MODMED_FIRM_PREFIX || "";
    const response = await modmedApi.post(
      `${firmPrefix}/api/v1/patients/${patientId}/allergies`,
      allergyData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating patient allergies:", error);
    throw new Error("Failed to update patient allergies");
  }
}

export async function getPatientMedications(patientId: string) {
  try {
    if (!accessToken) {
      await authenticateModMed();
    }

    const firmPrefix = process.env.MODMED_FIRM_PREFIX || "";
    const response = await modmedApi.get(
      `${firmPrefix}/api/v1/patients/${patientId}/medications`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching patient medications:", error);
    throw new Error("Failed to fetch patient medications");
  }
}
