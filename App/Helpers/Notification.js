import { createClient } from "@supabase/supabase-js";
import {SUPABASE_URL, ANON_KEY} from '@env'

// Configuración de Supabase
const supabase = createClient(
  SUPABASE_URL,
  ANON_KEY
);

console.log("Hello from Functions!");

// Definición de la interfaz de notificación
/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} user_id
 * @property {string} body
 */

/**
 * @typedef {Object} WebhookPayload
 * @property {"INSERT" | "UPDATE" | "DELETE"} type
 * @property {string} table
 * @property {Notification} record
 * @property {string} schema
 * @property {null | Notification} old_record
 */

// Función para manejar las solicitudes
const handleRequest = async (req, res) => {
  const payload = await req.json();
  const { data } = await supabase
    .from("profiles")
    .select("expo_push_token")
    .eq("id", payload.record.user_id)
    .single();

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ea711926-b785-4a86-ae6c-938ab58603d9`,
    },
    body: JSON.stringify({
      to: data?.expo_push_token,
      sound: "default",
      body: payload.record.body,
    }),
  }).then((res) => res.json());

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(response));
};

// Crear el servidor
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    handleRequest(req, res);
  } else {
    res.statusCode = 405;
    res.end();
  }
});

// Iniciar el servidor en el puerto 54321
server.listen(54321, () => {
  console.log("Server running at http://localhost:54321/");
});

// Para invocar la función, usa el siguiente comando curl:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
