import { getCustomRepository, Repository } from "typeorm";
import Settings from "../entities/Settings";
import SettingsRepository  from "../repositories/SettingsRepository"
 

interface ISettingsCreate {
    chat: boolean,
    username: string,
}

export default class SettingsService {

  private settingsRepository: Repository<Settings>

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }
 
  async create( { chat, username }: ISettingsCreate ) {

    const userAlreadyExists = await this.settingsRepository.findOne({ //buscando se o username ja existe no banco de dados.
        username
    });
    
    if(userAlreadyExists) { // lança um erro caso o usuário ja exista.
        throw new Error("Usuário ja existe!")
    }
   
    const settings = this.settingsRepository.create({ // cria o usuário
      chat,
      username,
    });

    await this.settingsRepository.save(settings); // salva o usuário
    return settings;
  }

  async findByUsername(username: string) {
    const settings = await this.settingsRepository.findOne({
      username
    });

    return settings;
  }

  async update(username: string, chat: boolean) {
    const settings = await this.settingsRepository.createQueryBuilder()
    .update(Settings)
    .set({chat})
    .where("username = :username", {
      username
    }).execute();
  }
}

// vai ser solicitado pelo settings controler. Responsável pela regra de negócio!!!