const socket = io();
let connectionsUsers = [];

// lista usuários para atendimento na tela de admin.
socket.on("admin_list_all_users", connections => {
    connectionsUsers = connections;
    document.getElementById("list_users").innerHTML = "";

    let template = document.getElementById("template").innerHTML;

    connections.forEach(connection => {
        const rendered = Mustache.render(template, {
            email: connection.user.email, // relation criada em findAllWithoutAdmin
            id: connection.socket_id
        })

        document.getElementById("list_users").innerHTML += rendered;
    });
});

// ao clicar em abrir atendimento, vai abrir uma nova div: chat com o user para o admin.
function call(id) {
    const connection = connectionsUsers.find(connection => connection.socket_id === id);

    const template = document.getElementById("admin_template").innerHTML;

    const rendered = Mustache.render(template, {
        email: connection.user.email,
        id: connection.user_id
    });

    document.getElementById("supports").innerHTML += rendered;

    const params = {
        user_id: connection.user_id
    }

    // evento para ter acesso as msgs do usário
    socket.emit("admin_list_messages_by_user", params, messages => {
        const divMessages = document.getElementById(`allMessages${connection.user_id}`);

        messages.forEach((message) => {
            const createDiv = document.createElement("div");

            if(message.admin_id === null) { // msg user
                createDiv.className = "admin_message_client";

                createDiv.innerHTML = `<span>${connection.user.email}</span>`;
                createDiv.innerHTML += `<span>${message.text}</span>`;
                createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYY HH:mm:ss")}`

            } else { //msg atendente
                createDiv.className = "admin_message_admin";

                createDiv.innerHTML = `Atendente: <span>${message.text}</span>`;
                createDiv.innerHTML = `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYY HH:mm:ss")}</span>`
                
            }

            divMessages.appendChild(createDiv);
        });

    });

}