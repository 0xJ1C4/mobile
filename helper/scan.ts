import { NEXT_API_URL } from "@/constants/api"


export const getReceiptContent =  async (image: string) => {
    const dataS = {
        image: `data:image/jpeg;base64,${image}`
    }
    try {
        const request = await fetch(`${NEXT_API_URL}/api/scan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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