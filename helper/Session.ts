import * as SecureStore from "expo-secure-store";
import { NEXT_API_URL } from "@/constants/api";

export const saveSessionFromQr = async (data: string) => {
  const saveData = await SecureStore.setItemAsync("session", data);

  return saveData;
};

export const getSession = async () => {
  const data = await SecureStore.getItemAsync("session");

  return data;
};

export const removeSession = async () => {
  const session = await SecureStore.setItemAsync("session", "");

  return session;
};



export const getUser = async () => {
  const session = await getSession();
  try {
    const response = await fetch(`${NEXT_API_URL}/api/user`, {
      credentials:'include',
      method: "GET",
      headers: {
        'Authorization': `Bearer ${session}`
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized. Session expired, please scan a new QR.");
      }
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("An unexpected error occurred.");
  }
};
