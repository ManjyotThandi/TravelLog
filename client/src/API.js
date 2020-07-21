// Back end URL
const API_URL = 'http://localhost:1337'

//using fetch (Defaults to get). Could have used axios
export  function listLogEntries () {
 const response =  fetch(`${API_URL}/api/logs`);
 return response.json()
}