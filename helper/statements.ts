import { NEXT_API_URL } from "@/constants/api";
import { getSession } from "./Session";

export const getStatement = async () => {
  const session = await getSession();

  const req = await fetch(`${NEXT_API_URL}/api/total/month`, {
    method: "GET",
  });

  if (req.ok) {
    const data = await req.json();
    return data;
  }
};
