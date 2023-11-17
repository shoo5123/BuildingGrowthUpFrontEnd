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
} from "react-icons/gi"
import { SuggestStatus } from "../const/SuggestStatus";

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

const DoingAndRejectButtonArea = styled.div`
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
  selectedStatus: SuggestStatus | undefined;
  onClick: (status: SuggestStatus) => void;
};

interface StatusButtonProps {
  status: SuggestStatus;
  selectedStatus: SuggestStatus | undefined;
  onClick: (status: SuggestStatus) => void;
};

const getRightIconDiv = () => {
  return (
    <RightIconDiv>
      <RightIcon size="18" />
    </RightIconDiv>
  );
};

const FilterStatusButton: React.FC<StatusButtonProps> = ({ status, selectedStatus, onClick }) => {
  if (status == "new") {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus=="new"}>
        <StatusTitle>
          投票前
        </StatusTitle>
        <SeedIcon size="16" color="#228B22" />
      </FilterButtonDiv>
    );
  } else if (status == "voting") {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus=="voting"}>
        <StatusTitle>
          検討中
        </StatusTitle>
        <SproutIcon size="16" color="#228B22" />
      </FilterButtonDiv>
    );
  } else if (status == "doing") {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus=="doing"}>
        <StatusTitle>
          プロジェクト進行中
        </StatusTitle>
        <GrowthIcon size="16" color="#228B22" />
      </FilterButtonDiv>
    );
  } else if (status == "reject") {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus=="reject"}>
        <StatusTitle>
          否決
        </StatusTitle>
        <RejectIcon size="16" color="#228B22" />
      </FilterButtonDiv>
    );
  } else if (status == "done") {
    return (
      <FilterButtonDiv onClick={() => onClick(status)} isSelected={selectedStatus=="done"}>
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
        <FilterStatusButton status={"new"} selectedStatus={selectedStatus} onClick={onClick} />
        {getRightIconDiv()}
        <FilterStatusButton status={"voting"} selectedStatus={selectedStatus} onClick={onClick} />
        {getRightIconDiv()}
        <DoingAndRejectButtonArea>
          <FilterStatusButton status={"doing"} selectedStatus={selectedStatus} onClick={onClick} />
          <OrDiv>or</OrDiv>
          <FilterStatusButton status={"reject"} selectedStatus={selectedStatus} onClick={onClick} />
        </DoingAndRejectButtonArea>
        {getRightIconDiv()}
        <FilterStatusButton status={"done"} selectedStatus={selectedStatus} onClick={onClick} />
      </FilterStatusArea>
    </FilterArea>
  );
};
