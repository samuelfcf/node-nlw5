import { getCustomRepository, Repository } from "typeorm";
import Users from "../entities/Users";
import UsersRepository from "../repositories/UsersRespository"
 export default class UsersService {
  private usersRepository: Repository<Users>

  constructor () {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  
  async create(email: string) {
    const userExists = await this.usersRepository.findOne({ //buscando se o usuario com email passado ja existe
        email
    });
    
    if(userExists) { //  verifica se o usuário existe no bd, se sim retorna o usuário existente
        return userExists
    }
   
    const user = this.usersRepository.create({ // casei n exista, cria novo usuario
        email
    })

    await this.usersRepository.save(user); // salva o usuário criado
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email })
    return user
}
}