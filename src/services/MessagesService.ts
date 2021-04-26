import { getCustomRepository, Repository } from "typeorm";
import Messages from "../entities/Messages";
import MessagesRepository from "../repositories/MessagesRepository";

interface IMessageCreate {
    admin_id?: string,
    text: string,
    user_id: string
}

export default class MessagesService {

    private messagesRespository: Repository<Messages>

    constructor() {
        this.messagesRespository = getCustomRepository(MessagesRepository)
    }

    async create( {admin_id, text, user_id}: IMessageCreate) {
        
        const message = this.messagesRespository.create({
        admin_id,
        text,
        user_id,
        });

        await this.messagesRespository.save(message);

        return message;
    }    

    async listByUser(user_id: string){ // retorno das mensagens para o usuário
        
        const list = await this.messagesRespository.find({
            where: { user_id },
            relations: ["user"] // nome atribuindo dentro da entidade de message!!
        });

        return list
    }
}