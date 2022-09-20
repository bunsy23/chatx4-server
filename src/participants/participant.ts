import {
  CreateParticipantParams,
  FindParticipantParams,
} from './../utils/types';
import { Participant } from 'src/utils/typeorm';

export interface IParticipantsService {
  findParticipant(
    findParticipantParams: FindParticipantParams,
  ): Promise<Participant | null>;

  createParticipant(
    createParticipantParams: CreateParticipantParams,
  ): Promise<Participant>;
}
