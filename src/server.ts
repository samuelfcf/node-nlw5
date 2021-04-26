import {http} from "./http"
import "./websocket/client";
import "./websocket/admin";


http.listen(3333, () => {
  console.clear()
  console.log("Server is run on port 🚪", 3333)
})

// código da aula1: missaoespacial
// código aula2: embuscadoproximonivel