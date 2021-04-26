import { EntityRepository, Repository } from "typeorm";
import Users from "../entities/Users";

@EntityRepository(Users)
export default class UsersRepository extends Repository<Users> {

}