import express, { json } from 'express';
import { createServer } from "http";
import { Server, Socket } from "socket.io"

import './database';
import routes from './routes'
import path from "path"

const app = express()

// configurando leitura de public (html dentro das rotas)
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request,response) => {
  return response.render("html/client.html")
})
app.get("/pages/admin", (request,response) => {
  return response.render("html/admin.html")
})

const http = createServer(app); // criando protocolo http.
const io = new Server(http); // criando protocolo websocket.

io.on("connection", (socket: Socket) => {
  console.log("se conectou!!", socket.id)
})

app.use(express.json())
app.use(routes)

export {http, io}

// esse arquivo foi criado para que possamos utilizar os dois protocolos
// http no SERVER e io nos arquivos de websocket