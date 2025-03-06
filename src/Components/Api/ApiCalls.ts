//function to make 'get' calls using specified url endpoint and agent token
export async function makeApiGetCall(endpoint: string, agentToken:string) {
    try {
        const urlToCall = `https://api.spacetraders.io/v2/${endpoint}`;
        const resp = await fetch(urlToCall, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${agentToken}`,
                "Content-Type": "application/json",
            },
        })
        //parse result
        const json = await resp.json();

        return [json, resp.ok]
    }
    catch (e) {
        return ([{ error: e }, false]);
    }
}

//function to make 'get' calls using specified url endpoint and agent token
export async function makeApiPostCall(endpoint: string, agentToken:string, requestBody:string) {
    try {
        const urlToCall = `https://api.spacetraders.io/v2/${endpoint}`;
        const resp = await fetch(urlToCall, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${agentToken}`,
                "Content-Type": "application/json",
            },
            body:requestBody,
        });
        //parse result
        const json = await resp.json();

        return [json, resp.ok]
    }
    catch (e) {
        return ([{ error: e }, false]);
    }
}