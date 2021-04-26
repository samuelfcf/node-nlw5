let socket_admin_id = null
let emailUser = null
let socket = null

document.querySelector("#start_chat").addEventListener("click", (event) => {
    socket = io();

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";

    const email = document.getElementById("email").value;
    emailUser = email;

    const text = document.getElementById("txt_help").value;

    // criando conexão ao clicar no botao
    socket.on("connect", () => {
        const params = {
            email,
            text,
        };

        socket.emit("client_first_acess", params, (call, err) => { // emitindo evento criando em client.ts
            if (err) {
                console.err(err);
            } else {
                console.log(call);
            }
        });
    });

    // renderizando as msgs do user no banco de dados no template do user
    socket.on("client_list_all_messages", messages => {
        let template_client = document.getElementById("message-user-template").innerHTML;
        let template_admin = document.getElementById("admin-template").innerHTML;

        messages.forEach(message => {
            if (message.admin_id === null) { // msg do user
                const rendered = Mustache.render(template_client, {
                    message: message.text,
                    email
                });

                document.getElementById("messages").innerHTML += rendered
            } else { // msg do admin
                const rendered = Mustache.render(template_admin, {
                    message_admin: message.text,
                });

                document.getElementById("messages").innerHTML += rendered
            }
        })
    });

    // renderizando msg enviada pelo admin no template de usuário.
    socket.on("admin_send_to_client", message => {
        socket_admin_id = message.socket_id;
        const template_admin = document.getElementById("admin-template").innerHTML;
        
        const rendered = Mustache.render(template_admin, {
            message_admin: message.text
        });

        document.getElementById("messages").innerHTML += rendered;
    });
});


// enviar msg do user para o admin quando o chat ja esta iniciado // renderizar a msg enviada pelo user no proprio template de user
document.querySelector("#send_message_button").addEventListener("click", (event) => {
    const text = document.getElementById("message_user");

    const params = {
        text: text.value,
        socket_admin_id
    };

    socket.emit("client_send_to_admin", params);

    const template_client = document.getElementById("message-user-template").innerHTML;

    const rendered = Mustache.render(template_client, {
        message: text.value,
        email: emailUser
    });

    document.getElementById("messages").innerHTML += rendered
});

