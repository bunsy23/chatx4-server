import {
  FindParticipantParams,
  CreateParticipantParams,
} from './../utils/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Participant } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { IParticipantsService } from './participant';

@Injectable()
export class ParticipantsService implements IParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
  ) {}

  findParticipant(
    findParticipantParams: FindParticipantParams,
  ): Promise<Participant | null> {
    const { id } = findParticipantParams;
    return this.participantsRepository.findOne({ id });
  }

  createParticipant(
    createParticipantParams: CreateParticipantParams,
  ): Promise<Participant> {
    const participant = this.participantsRepository.create(
      createParticipantParams,
    );

    return this.participantsRepository.save(participant);
  }
}
