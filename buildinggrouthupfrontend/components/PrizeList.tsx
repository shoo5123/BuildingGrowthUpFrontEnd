import styled from "styled-components";
import { GiFruitBowl as FruitIcon } from "react-icons/gi";

const PrizeArea = styled.div`
  height: 476px;
  overflow: auto;
`;

const PrizeLine = styled.div`
  height: 64px;
  padding: 0px 20px;
  margin: 8px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #DEFBFB;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background: #E5FFCC;
  }
`;

const PrizeTitle = styled.div`
  font-size: 18px;
`;

const PrizePriceArea = styled.div`
  display: flex;
  align-items: center;
`;

const PrizePrice = styled.div`
  margin-left: 12px;
  font-size: 20px;
  font-weight: bold;
  color: #F5EF6C;
`;

interface Props {
  prizeList: Array<PrizeProps>;
  changeOpenPrizeModal: (selectedPrizeId: number | undefined) => void;
}

export interface PrizeProps {
  prizeId: number;
  title: string;
  imageUrl: string;
  description: string;
  prizeFruit: number;
}

export const PrizeList: React.FC<Props> = ({ prizeList, changeOpenPrizeModal }) => {
  return (
    <PrizeArea>
      {prizeList.map((prize) => {
        return (
          <PrizeLine key={prize.prizeId} onClick={() => changeOpenPrizeModal(prize.prizeId)}>
            <PrizeTitle>{prize.title}</PrizeTitle>
            <PrizePriceArea>
              <FruitIcon size="24" color="#F5EF6C" />
              <PrizePrice>{prize.prizeFruit}</PrizePrice>
            </PrizePriceArea>
          </PrizeLine>
        );
      })}
    </PrizeArea>
  );
};
