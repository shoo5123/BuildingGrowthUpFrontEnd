export interface ProposalResponse {
    id: number;
    proposalId: string;
    description: string;
    proposer: string;
    startBlock: number;
    endBlock: number;
    status: number;
}