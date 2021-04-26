import {io} from "../http";
import ConnectionsService from "../services/ConnectionsService";
import MessagesService from "../services/MessagesService";

io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    //Devolve as msgs do usuário para o admin, método emitido em admin.js
    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id } = params;

        const allMessages = await messagesService.listByUser(user_id);

        callback(allMessages);
    });

    // enviar msgs do admin para o usuário.
    socket.on("admin_send_message", async(params) => {
        const { user_id, text } = params;

        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        const { socket_id } = await connectionsService.findByUserId(user_id); // pegando o socker_id do usuário!! 

        //emitindo msg -- evento criado aqui será ouvido pelo client em chatjs
        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id,
        });
    });
});