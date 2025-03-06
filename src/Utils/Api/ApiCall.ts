//function to make 'get' calls using specified url endpoint and agent token
export async function makeApiCall(endpoint: string, request:RequestInit) {
    const urlToCall = `https://api.spacetraders.io/v2/${endpoint}`;
    return fetch(urlToCall, request);
}