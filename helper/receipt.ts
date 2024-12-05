import { NEXT_API_URL } from "@/constants/api"
import { ReceiptData } from "@/constants/types";
import { getSession } from "./Session";



export const getReceiptContent =  async (image: string) => {
    const session = await getSession();
    const dataS = {
        image: `data:image/jpeg;base64,${image}`
    }
    try {
        const request = await fetch(`${NEXT_API_URL}/api/scan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session}`
            },
            body: JSON.stringify(dataS)
        });
        const data = await request.json();
        if(request.ok) {
            return data;
        }
        else {
            throw new Error(data?.message);
        }
    } catch (error) {
        console.log(error)    
    }
}

export const saveReceiptContent = async (receipt: unknown) => {
    const session = await getSession();
    try {
        const req = await fetch(`${NEXT_API_URL}/api/receipt`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session}`
            },
            body: JSON.stringify(receipt)
        });
        const data = await req.json();

        if(req.ok) {
            return data;
        }
        else {
            throw new Error(data?.message)
        }
    } catch (error) {
        console.log(error)
    }
}