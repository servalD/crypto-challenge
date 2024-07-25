export interface IChallengeRequest{challenge_id: string,sentence: string}

export interface IChallengeResponse{
    Sentence: string;
    hash: string;
    ciphertext: string;
    publickey: string;
    ChallengeID: string;
}
