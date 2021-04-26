import { getCustomRepository, Repository } from "typeorm";
import Connections from "../entities/Connetions";
import ConnectionsRespository from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
    socket_id: string,
    user_id: string,
    admin_id?: string,
    id?: string;
}

export default class ConnectionsService{
    private connectionsRepository: Repository<Connections>

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRespository)
    }
    
    async create({socket_id, user_id, admin_id, id}: IConnectionCreate) { // criando conexão
        const connection = this.connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connectionsRepository.save(connection)

        return connection
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionsRepository.findOne({
            user_id
        });

        return connection;
    }

    async findAllWithoutAdmin() {
        const connection = await this.connectionsRepository.find({
            where: {admin_id: null},
            relations: ["user"]
        });

        return connection;

    };

    async findBySocketID(socket_id: string) {
        const connection = await this.connectionsRepository.findOne({
            socket_id
        });

        return connection;
    }
}