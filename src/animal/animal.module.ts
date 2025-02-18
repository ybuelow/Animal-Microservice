import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

@Module({
    imports: [TypeOrmModule.forFeature([Animal])],
    providers: [AnimalController, AnimalService],
    exports: []
})
export class AnimalModule {}
