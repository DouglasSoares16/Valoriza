import { TagsRepositories } from "../repositories/TagsRepositories";
import { getCustomRepository } from "typeorm";

class CreateTagService {
    async execute(name: string) {
        const tagsRepository = getCustomRepository(TagsRepositories);

        if(!name) {
            throw new Error("Incorrect Name!");
        }

        const tagAlreadyExists = await tagsRepository.findOne({
            name
        })

        if(tagAlreadyExists) {
            throw new Error("Tag já existe");
        }

        const tag = tagsRepository.create({
            name
        });

        await tagsRepository.save(tag);

        return tag;
        
    }
}

export { CreateTagService }