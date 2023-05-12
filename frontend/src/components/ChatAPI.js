/*


const BASE_URL = "http://localhost:3000";

export const getMessages = () => {
  return fetch(`${BASE_URL}/messages`).then((response) => response.json());
  /!** Die getMessages Funktion holt sich über die Fetch-Abfrage die vorhandenen Nachrichten.
   *  Sie werden als Promise zurückgegeben, welches im JSON-Format geparst wird. *!/
};

export const sendMessage = (text) => {
  return fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
    /!** Die sendMessage Funktion sendet über die POST-Methode neue Nachrichten an die URL mit der Endung /messages.
    *   Das Text Argument ist in diesem Fall der Content der Nachricht. *!/
  });
};*/
