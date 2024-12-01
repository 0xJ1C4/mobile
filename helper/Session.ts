import * as SecureStore from "expo-secure-store";
import { NEXT_API_URL } from "@/constants/api";

export const saveSessionFromQr = async (data: string) => {
  const saveData = await SecureStore.setItemAsync("session", data);

  return saveData;
};

export const getSession = async () => {
  const data = await SecureStore.getItemAsync("session");

  console.log(data);

  return data;
};

export const removeSession = async () => {
  const session = await SecureStore.setItemAsync("session", "");

  return session;
};

export const signOut = async () => {
  const session = await getSession();
  const req = await fetch(`${NEXT_API_URL}/api/auth/signout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: `__Secure-authjs.session-token=${session};`,
    },
    body: await fetch(`${NEXT_API_URL}/api/auth/csrf`, {
      headers: {
        Cookie: `__Secure-authjs.session-token=${session}`,
      },
    }).then((rs) => rs.text()),
  });

  await removeSession();
  return req;
};

export const getUser = async () => {
  const session = await getSession();

  if (session) {
    const req = await fetch(`${NEXT_API_URL}/api/user`, {
      method: "GET",
      headers: {
        Cookie: `;__Secure-authjs.session-token=${session}`,
      },
    });
    try {
      if (req.ok) return await req.json();
    } catch (error) {
      throw new Error("session expired, Please scan new QR");
    }
  } else {
    throw new Error("No session found");
  }
};
