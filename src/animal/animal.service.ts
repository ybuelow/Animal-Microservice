import { Injectable } from '@nestjs/common';
import { Animal } from './animal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalService {
    constructor(
        @InjectRepository(Animal)
        private animalRepository: Repository<Animal>
    ) {}

    async getAll(): Promise<Animal[]> {
        let animals = await this.animalRepository.find();
        return animals;
    }
}
