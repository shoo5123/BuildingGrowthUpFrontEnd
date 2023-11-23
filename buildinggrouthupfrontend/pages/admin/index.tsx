import { PageTemplate } from "../../components/PageTemplate";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

const FORM_COMPONENT_WIDTH = 480;

const PageTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 36px;
`;

const CreateProposalArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 36px;
`;

const FormTitleArea = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormTitle = styled.div`
  width: 180px;
  font-size: 24px;
  font-weight: bold;
`;

const FormTitleTemplateComponent = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const TitleTextForm = styled.input`
  width: ${FORM_COMPONENT_WIDTH}px;
  height: 28px;
  border: solid 1px #000000;
  font-size: 16px;
`;

const DescriptionTextAreaForm = styled.textarea`
  width: ${FORM_COMPONENT_WIDTH}px;
  height: 540px;
  font-size: 16px;
`;

const OfferTextForm = styled.input`
  width: ${FORM_COMPONENT_WIDTH}px;
  height: 28px;
  border: solid 1px #000000;
  font-size: 16px;
`;

const ButtonArea = styled.div`
  height: 64px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CreateProposalButton = styled.button`
  height: 28px;
  padding: 0px 8px;
`;

const BackButton = styled.button`
  height: 28px;
  padding: 0px 8px;
`;

const getFormTitle = (title: string) => {
  return (
    <FormTitleArea>
      <FormTitle>{title}</FormTitle>
      <FormTitleTemplateComponent>：</FormTitleTemplateComponent>
    </FormTitleArea>
  );
};

const AdminPage: NextPage = () => {
  const router = useRouter();
  const { contract } = useContract("0x54841235DC6CCae58bB308faE37bCD2605C23ada");
  const { mutateAsync: propose, isLoading } = useContractWrite(contract, "propose");
  const targets = ["0x2B38BA2E0C8251D02b61C4DFBEe161dbb6AE3e66"];
  const values = [5];
  const calldatas = ["0x4554480000000000000000000000000000000000000000000000000000000000"];
  const description = "test5";
  const callPropose = async () => {
    try {
      const data = await propose({ args: [targets, values, calldatas, description] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
  return (
    <PageTemplate>
      <PageTitle>
        Create Proposal
      </PageTitle>
      <CreateProposalArea>
        <div>
          <FormLine>
            {getFormTitle("TITLE")}
            <TitleTextForm type="text" />
          </FormLine>
          <FormLine>
            {getFormTitle("DESCRIPTION")}
            <DescriptionTextAreaForm />
          </FormLine>
          <FormLine>
            {getFormTitle("OFFER")}
            <OfferTextForm type="text" />
          </FormLine>
        </div>
        <ButtonArea>
          <CreateProposalButton onClick={() => {
            callPropose();
          }}>
            提案作成
          </CreateProposalButton>
          <BackButton onClick={() => router.push('/')}>戻る</BackButton>
        </ButtonArea>
      </CreateProposalArea>
    </PageTemplate>
  );
};

export default AdminPage;
