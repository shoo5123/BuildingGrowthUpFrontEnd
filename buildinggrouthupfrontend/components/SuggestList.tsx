import { SuggestStatus } from "../const/SuggestStatus";
import { FilterStatus } from "./FilterStatus";
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

const SuggestArea = styled.div`
  width: 700px;
`;

const SuggestListArea = styled.div`
  height: 380px;
  overflow: auto;
`;

const SuggestLine = styled.div`
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

const SuggestTitle = styled.div`
  font-size: 18px;
`;

const SuggestLimitAndIconArea = styled.div`
  display: flex;
  align-items: center;
`;

const SuggestLimitArea = styled.div`
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
  suggestList: Array<SuggestProps>;
  changeOpenSuggestModal: (selectedSuggestId: number | undefined) => void;
}

export interface SuggestProps {
  suggestId: number;
  title: string;
  status: SuggestStatus;
  startDate: string;
  endDate: string;
  description: string;
}

/**
 * 期限までの日数の文字列を返す
 *
 * @param status ステータス
 * @param finishDateStr 期限（YYYY-MM-DD）、statusがdoneの場合は完了日
 * @returns 期限までの日数の文字列
 */
const getSuggestStatusLimit = (status: SuggestStatus, finishDateStr: string) => {
  const today = moment();
  const finishDate = moment(finishDateStr)
  const limitDay = finishDate.clone().diff(today, "days")
  if (status == "done") {
    return (
      <SuggestLimitArea>
        <CheckIcon size="16" />
        達成日 {finishDate.format("YYYY/MM/DD")}
      </SuggestLimitArea>
    );
  } else if (status == "reject") {
    return (
      <SuggestLimitArea>
        芽吹きませんでした
      </SuggestLimitArea>
    );
  } else {
    return (
      <SuggestLimitArea>
        <LimitIcon size="16" />
        次のステップまであと {limitDay} 日
      </SuggestLimitArea>
    );
  }
};

const getSuggestStatusIcon = (status: SuggestStatus) => {
  switch (status) {
    case "new":
      return (
        <SeedIcon size="28" color="#228B22" />
      );
    case "voting":
      return (
        <SproutIcon size="28" color="#228B22" />
      );
    case "doing":
      return (
        <GrowthIcon size="28" color="#228B22" />
      );
    case "reject":
      return (
        <RejectIcon size="28" color="#228B22" />
      );
    case "done":
      return (
        <TreeIcon size="28" color="#228B22" />
      );
    }
};

export const SuggestList: React.FC<Props> = ({ suggestList, changeOpenSuggestModal }) => {
  const [selectedStatus, setSelectedStatus] = useState<SuggestStatus | undefined>(undefined);
  const onClickFilterStatusButton = (status: SuggestStatus) => {
    if (status == selectedStatus) {
      setSelectedStatus(undefined);
    } else {
      setSelectedStatus(status);
    }
  };
  const selectedSuggestList = suggestList.filter((suggest) => {
    if (!selectedStatus) {
      return suggest;
    } else {
      return suggest.status == selectedStatus;
    }
  });
  return (
    <SuggestArea>
      <FilterStatus selectedStatus={selectedStatus} onClick={onClickFilterStatusButton} />
      <SuggestListArea>
        {selectedSuggestList.map((suggest) => {
          return (
            <SuggestLine onClick={() => {changeOpenSuggestModal(suggest.suggestId)}}>
              <SuggestTitle>
                {suggest.title}
              </SuggestTitle>
              <SuggestLimitAndIconArea>
                {getSuggestStatusLimit(suggest.status, suggest.endDate)}
                {getSuggestStatusIcon(suggest.status)}
              </SuggestLimitAndIconArea>
            </SuggestLine>
          );
        })}
      </SuggestListArea>
    </SuggestArea>
  );
};
