import { PrizeProps } from "./PrizeList";
import styled from "styled-components";

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

const PrizeTitleArea = styled.div`
  height: 62px;
  padding-left: 8px;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: bold;
`;

const PrizeDescriptionArea = styled.div`
  height: 400px;
  border-top: solid 1px #000000;
  border-bottom: solid 1px #000000;
`;

const ButtonArea = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseModalButton = styled.div`
  height: 48px;
  margin: 8px 0px;
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
  selectedPrize: PrizeProps | undefined;
  setSelectedPrizeId: (selectedPrizeId: number | undefined) => void;
};

const PrizeDetailModal: React.FC<Props> = ({ selectedPrize, setSelectedPrizeId }) => {
  if (selectedPrize != undefined) {
    return (
      <OverlayDiv>
        <ModalComponent>
          <PrizeTitleArea>
            {selectedPrize.title}
          </PrizeTitleArea>
          <PrizeDescriptionArea>
            {selectedPrize.description}
          </PrizeDescriptionArea>
          <ButtonArea>
            <CloseModalButton onClick={() => setSelectedPrizeId(undefined)}>
              閉じる
            </CloseModalButton>
          </ButtonArea>
        </ModalComponent>
      </OverlayDiv>
    );
  } else {
    return (<></>);
  }
};

export default PrizeDetailModal;
