export interface IParticipantKey {
  participantId: number;
}

export interface IParticipantData {
  lastName: string;
  firstName: string;
  categoryId: number;
  teamId?: number;
}

export interface IParticipant extends IParticipantKey, IParticipantData {}
