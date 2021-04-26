import { Request, Response } from "express";
import SettingsService from "../services/SettingsService";

export default class SettingsControler {
    async create(request: Request, response: Response) {
        
    const { chat, username } = request.body
    
    const settingsService = new SettingsService();

    try { 
        const settings = await settingsService.create({ chat, username })

        return response.json(settings);
    } catch (err) { // tratativa de erro lançada no service!!
        return response.status(400).json({
            message: err.message
        })
    }

    }

    async findByUsername(request: Request, response: Response) {
        const { username } = request.params;

        const settingsService = new SettingsService()
        const settings = await settingsService.findByUsername(username);

        return response.json(settings)
    }

    async update(request: Request, response: Response) {
        const { username } = request.params;
        const {chat} = request.body

        const settingsService = new SettingsService()
        const settings = await settingsService.update(username, chat);

        return response.json(settings)
    }
}

// vai receber a requisição do cliente e mandar os parâmetros para que o serice execute a regra de negócio
// ficará esperando a resposta do service.
