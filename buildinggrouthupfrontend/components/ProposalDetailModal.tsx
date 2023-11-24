import { Proposal } from "./ProposalList";
import { ProposalState } from "../enum/ProposalState";
import { VoteType } from "../enum/VoteType";
import styled from "styled-components";

const BUTTON_HEIGHT = 48;

const OverlayDiv = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalComponent = styled.div`
  z-index: 2;
  width: 720px;
  height: 540px;
  background: #FFFFFF;
`;

const ProposalTitleArea = styled.div`
  height: 62px;
  padding-left: 8px;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: bold;
`;

const ProposalDescriptionArea = styled.div`
  height: 400px;
  border-top: solid 1px #000000;
  border-bottom: solid 1px #000000;
`;

const ButtonArea = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonsArea = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ButtonComponent = styled.button`
  height: ${BUTTON_HEIGHT}px;
  padding: 0px 16px;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px #000000;
  border-radius: 8px;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    background: #DEFBFB;
  }
`;

interface Props {
  selectedProposal: Proposal | undefined;
  setSelectedProposalId: (selectedProposalId: number | undefined) => void;
  castVote: (proposalId: string, support: number) => void;
  getHasVoted: (proposalId: string) => boolean;
  execute: (proposal: Proposal) => void;
};

const getButtonsArea = (
  proposalStatus: ProposalState,
  setSelectedProposalId: (id: number | undefined) => void,
  castVote: (voteType: VoteType) => void,
  hasVoted: boolean,
  execute: () => void
) => {
  if (proposalStatus == ProposalState.Active) {
    return (
      <ButtonsArea>
        <ButtonComponent
          onClick={() => {
            castVote(VoteType.For);
            setSelectedProposalId(undefined);
          }}
          disabled={hasVoted}
        >
          賛成
        </ButtonComponent>
        <ButtonComponent
          onClick={() => {
            castVote(VoteType.Against)
            setSelectedProposalId(undefined);
          }}
          disabled={hasVoted}
        >
          否決
        </ButtonComponent>
        <ButtonComponent onClick={() => setSelectedProposalId(undefined)}>閉じる</ButtonComponent>
      </ButtonsArea>
    );
  } else if (proposalStatus == ProposalState.Succeeded) {
    return (
      <ButtonsArea>
        <ButtonComponent
          onClick={() => {
            execute();
            setSelectedProposalId(undefined);
          }}
        >
          プロジェクト完了
        </ButtonComponent>
        <ButtonComponent onClick={() => setSelectedProposalId(undefined)}>閉じる</ButtonComponent>
      </ButtonsArea>
    );
  } else {
    return (
      <ButtonsArea>
        <ButtonComponent onClick={() => setSelectedProposalId(undefined)}>閉じる</ButtonComponent>
      </ButtonsArea>
    );
  }
}

const ProposalDetailModal: React.FC<Props> = ({ selectedProposal, setSelectedProposalId, castVote, getHasVoted, execute }) => {
  if (selectedProposal != undefined) {
    const hasVoted = getHasVoted(selectedProposal.proposalId);
    return (
      <OverlayDiv>
        <ModalComponent>
          <ProposalTitleArea>
            {selectedProposal.title}
          </ProposalTitleArea>
          <ProposalDescriptionArea>
            {selectedProposal.description}
          </ProposalDescriptionArea>
          <ButtonArea>
            {getButtonsArea(
              selectedProposal.status,
              setSelectedProposalId,
              (voteType: VoteType) => castVote(selectedProposal.proposalId, voteType),
              hasVoted,
              () => execute(selectedProposal)
            )}
          </ButtonArea>
        </ModalComponent>
      </OverlayDiv>
    );
  } else {
    return (<></>);
  }
};

export default ProposalDetailModal;
