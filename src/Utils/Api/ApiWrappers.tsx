import { makeApiCall } from "./ApiCall";

//function to make 'get' calls using specified url endpoint and agent token
export async function makeApiGetCall(endpoint: string, agentToken:string) {
    try {
        const httpInfo = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${agentToken}`,
                "Content-Type": "application/json",
            },
        };

        const resp = await makeApiCall(endpoint, httpInfo);

        return[await resp.json(), resp.ok];
    }
    catch (e) {
        return ([{ error: e }, false]);
    }
}

//function to make 'get' calls using specified url endpoint and agent token
export async function makeApiPostCall(endpoint: string, agentToken:string, requestBody:string) {
    try {

        const httpInfo = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${agentToken}`,
                "Content-Type": "application/json",
            },
            body:requestBody,
        };

        const resp = await makeApiCall(endpoint, httpInfo);

        return[await resp.json(), resp.ok];
    }
    catch (e) {
        return ([{ error: e }, false]);
    }
}