import styled from "styled-components";

const PrizeArea = styled.div`
  height: 476px;
`;

const PrizeItem = styled.div`
  height: 150px;
  width: 148px;
  margin: 4px;
  border: split 1px #000000;
  border-radius: 8px;
`;

interface Props {
  prizeList: Array<PrizeProps>;
}

export interface PrizeProps {
  imageUrl: string;
  description: string;
  prizeFruit: number;
}

export const PrizeList: React.FC<Props> = ({ prizeList }) => {
  const prizeListLength = prizeList.length;
  return (
    <PrizeArea>

    </PrizeArea>
  );
};
