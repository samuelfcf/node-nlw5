import { EntityRepository, Repository } from "typeorm";
import Connections from "../entities/Connetions";

@EntityRepository(Connections)
export default class ConnectionsRespository extends Repository<Connections>{

}