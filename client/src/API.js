// Back end URL
const API_URL = 'http://localhost:1337'

//using fetch (Defaults to get). Could have used axios
export  function listLogEntries() {
 const response =  fetch(`${API_URL}/api/logs`);
 return response.json()
}

export async  function createLogEntry(entry) {
    const response =  await fetch(`${API_URL}/api/logs`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json()
   }