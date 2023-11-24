import { FilterStatus } from "./FilterStatus";
import { ProposalState } from "../enum/ProposalState";
import styled from "styled-components";
import {
  FaSeedling as SproutIcon,
  FaTree as TreeIcon,
} from "react-icons/fa";
import {
  GiGroundSprout as RejectIcon,
  GiPlantSeed as SeedIcon,
  GiPlantWatering as GrowthIcon,
} from "react-icons/gi"
import {
  IoIosCheckmarkCircleOutline as CheckIcon,
  IoIosTime as LimitIcon,
} from "react-icons/io";
import moment from "moment";
import { useState } from "react";

const ProposalArea = styled.div`
  width: 700px;
`;

const ProposalListArea = styled.div`
  height: 380px;
  overflow: auto;
`;

const ProposalLine = styled.div`
  height: 64px;
  padding: 0px 20px;
  margin: 8px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: #FFF7ED;
  &:hover {
    cursor: pointer;
    background: #E5FFCC;
  }
`;

const ProposalTitle = styled.div`
  font-size: 18px;
`;

const ProposalLimitAndIconArea = styled.div`
  display: flex;
  align-items: center;
`;

const ProposalLimitArea = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  margin-right: 8px;
  padding: 0px 8px;
  background: #e0e0e0;
  border-radius: 8px;
  font-size: 12px;
`;

interface Props {
  proposalList: Array<Proposal>;
  changeOpenProposalModal: (selectedProposalId: number | undefined) => void;
}

export interface ExecuteParam {
  targets: Array<string>;
  values: Array<number>;
  calldatas: Array<string>;
  description: string;
}

export interface Proposal {
  id: number;
  proposalId: string;
  title: string;
  description: string;
  proposer: string;
  start: string;
  end: string;
  status: number;
  executeParam: ExecuteParam;
}

/**
 * 期限までの日数の文字列を返す
 *
 * @param status ステータス
 * @param finishDateStr 期限（YYYY-MM-DD）、statusがdoneの場合は完了日
 * @returns 期限までの日数の文字列
 */
const getProposalStatusLimit = (status: ProposalState, finishDateStr: string) => {
  const dummyToday = "2023-11-19";
  // const today = moment();
  const today = moment(dummyToday);
  const finishDate = moment(finishDateStr)
  const limitDay = finishDate.clone().diff(today, "days")
  if (status == ProposalState.Executed) {
    return (
      <ProposalLimitArea>
        <CheckIcon size="16" />
        達成日 {finishDate.format("YYYY/MM/DD")}
      </ProposalLimitArea>
    );
  } else if (status == ProposalState.Defeated) {
    return (
      <ProposalLimitArea>
        芽吹きませんでした
      </ProposalLimitArea>
    );
  } else {
    return (
      <ProposalLimitArea>
        <LimitIcon size="16" />
        次のステップまであと {limitDay} 日
      </ProposalLimitArea>
    );
  }
};

const getProposalStatusIcon = (status: ProposalState) => {
  switch (status) {
    case ProposalState.Pending:
      return (
        <SeedIcon size="28" color="#228B22" />
      );
    case ProposalState.Active:
      return (
        <SproutIcon size="28" color="#228B22" />
      );
    case ProposalState.Succeeded:
      return (
        <GrowthIcon size="28" color="#228B22" />
      );
    case ProposalState.Defeated:
      return (
        <RejectIcon size="28" color="#228B22" />
      );
    case ProposalState.Executed:
      return (
        <TreeIcon size="28" color="#228B22" />
      );
    }
};

export const ProposalList: React.FC<Props> = ({ proposalList, changeOpenProposalModal }) => {
  // const dummyEndDate = "2023-11-11"; // TODO: タイムスタンプで返ってくるようになったらdummyをやめる
  const [selectedStatus, setSelectedStatus] = useState<ProposalState | undefined>(undefined);
  const onClickFilterStatusButton = (status: ProposalState) => {
    if (status == selectedStatus) {
      setSelectedStatus(undefined);
    } else {
      setSelectedStatus(status);
    }
  };
  const selectedProposalList = proposalList.filter((proposal) => {
    if (selectedStatus == undefined) {
      return proposal;
    } else {
      return proposal.status == selectedStatus;
    }
  });
  return (
    <ProposalArea>
      <FilterStatus selectedStatus={selectedStatus} onClick={onClickFilterStatusButton} />
      <ProposalListArea>
        {selectedProposalList.map((proposal) => {
          return (
            <ProposalLine key={proposal.id} onClick={() => {changeOpenProposalModal(proposal.id)}}>
              <ProposalTitle>
                {proposal.title}
              </ProposalTitle>
              <ProposalLimitAndIconArea>
                {/* {getProposalStatusLimit(proposal.status, proposal.end)} */}
                {getProposalStatusLimit(proposal.status, proposal.end)}
                {getProposalStatusIcon(proposal.status)}
              </ProposalLimitAndIconArea>
            </ProposalLine>
          );
        })}
      </ProposalListArea>
    </ProposalArea>
  );
};
