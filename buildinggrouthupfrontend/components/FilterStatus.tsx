import styled from "styled-components";
import { AiFillCaretRight as RightIcon } from "react-icons/ai";
import {
  FaSeedling as SproutIcon,
  FaTree as TreeIcon,
} from "react-icons/fa";
import {
  GiGroundSprout as RejectIcon,
  GiPlantSeed as SeedIcon,
  GiPlantWatering as GrowthIcon,
} from "react-icons/gi";
import { ProposalState } from "../enum/ProposalState";

const FilterArea = styled.div`
  height: 96px;
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.div`
  font-size: 16px;
`;

const FilterStatusArea = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
`;

const SucceededAndDefeatedButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const FilterButtonDiv = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  border: solid 1px #000000;
  border-radius: 4px;
  ${prop => prop.isSelected ? "background: #E5FFCC" : ""};
  &:hover {
    cursor: pointer;
    background: #F5FFE9;
  }
`;

const RightIconDiv = styled.div`
  margin: 0px 8px;
`;

const OrDiv = styled.div`
  margin: 4px 0px;
  font-size: 12px;
`;

const StatusTitle = styled.div`
  font-size: 16px;
`;

interface Props {
  selectedStatus: ProposalState | undefined;
  onClick: (status: ProposalState) => void;
};

interface StatusButtonProps {
  status: ProposalState;
  selectedStatus: ProposalState | undefined;
  onClick: (status: ProposalState) => void;
};

const getRightIconDiv = () => {
  return (
    <RightIconDiv>
      <RightIcon size="18" />
    </RightIconDiv>
  );
};

const FilterStatusButton: React.FC<StatusButtonProps> = ({ status, selectedStatus, onClick }) => {
  if (status == ProposalState.Pending) {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus==ProposalState.Pending}>
        <StatusTitle>
          投票前
        </StatusTitle>
        <SeedIcon size="16" color="#228B22" />
      </FilterButtonDiv>
    );
  } else if (status == ProposalState.Active) {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus==ProposalState.Active}>
        <StatusTitle>
          検討中
        </StatusTitle>
        <SproutIcon size="16" color="#228B22" />
      </FilterButtonDiv>
    );
  } else if (status == ProposalState.Succeeded) {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus==ProposalState.Succeeded}>
        <StatusTitle>
          プロジェクト進行中
        </StatusTitle>
        <GrowthIcon size="16" color="#228B22" />
      </FilterButtonDiv>
    );
  } else if (status == ProposalState.Defeated) {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus==ProposalState.Defeated}>
        <StatusTitle>
          否決
        </StatusTitle>
        <RejectIcon size="16" color="#228B22" />
      </FilterButtonDiv>
    );
  } else if (status == ProposalState.Executed) {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus==ProposalState.Executed}>
        <StatusTitle>
          プロジェクト完了
        </StatusTitle>
        <TreeIcon size="16" color="#228B22" />
      </FilterButtonDiv>
    );
  }
};

export const FilterStatus: React.FC<Props> = ({ selectedStatus, onClick }) => {
  return (
    <FilterArea>
      <FilterTitle>Filter:</FilterTitle>
      <FilterStatusArea>
        <FilterStatusButton status={ProposalState.Pending} selectedStatus={selectedStatus} onClick={onClick} />
        {getRightIconDiv()}
        <FilterStatusButton status={ProposalState.Active} selectedStatus={selectedStatus} onClick={onClick} />
        {getRightIconDiv()}
        <SucceededAndDefeatedButtonArea>
          <FilterStatusButton status={ProposalState.Succeeded} selectedStatus={selectedStatus} onClick={onClick} />
          <OrDiv>or</OrDiv>
          <FilterStatusButton status={ProposalState.Defeated} selectedStatus={selectedStatus} onClick={onClick} />
        </SucceededAndDefeatedButtonArea>
        {getRightIconDiv()}
        <FilterStatusButton status={ProposalState.Executed} selectedStatus={selectedStatus} onClick={onClick} />
      </FilterStatusArea>
    </FilterArea>
  );
};
