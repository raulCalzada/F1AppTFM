export interface VoteQuestion {
  id: number;
  question: string;
  status: number;        // 1: active, 2: inactive, 3: historic 
  statusDescr: string;   
  options: string[];
  votes : Vote[]
}

export interface Vote{
    voteOption: number
    userId: number
}