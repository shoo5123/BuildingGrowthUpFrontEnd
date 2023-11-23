import { PageTemplate } from "../../components/PageTemplate";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import contractData from "../../contract/custom_abi.json";

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

const FormTitleTemplateComponent = styled.div<{ isInvisible: boolean }>`
  font-size: 24px;
  font-weight: bold;
  ${prop => prop.isInvisible ? "color: #FFFFFF" : ""};
`;

const TitleTextForm = styled.input`
  width: ${FORM_COMPONENT_WIDTH}px;
  height: 28px;
  border: solid 1px #000000;
  font-size: 16px;
`;

const DescriptionTextAreaForm = styled.textarea`
  width: ${FORM_COMPONENT_WIDTH}px;
  // height: 540px;
  height: 400px;
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

interface ProposalRequestParam {
  title: string;
  description: string;
  offers: Array<string>;
}

const getFormTitle = (title: string) => {
  let isInvisible = false;
  if (title == "") {
    isInvisible = true;
  }
  return (
    <FormTitleArea>
      <FormTitle>{title}</FormTitle>
      <FormTitleTemplateComponent isInvisible={isInvisible} >：</FormTitleTemplateComponent>
    </FormTitleArea>
  );
};

const AdminPage: NextPage = () => {
  const router = useRouter();
  const contractJsonData = JSON.stringify(contractData);
  const contractObject = JSON.parse(contractJsonData);
  const { contract } = useContract("0x63F4a29Bb25920E563144bbbcE4B15f8D1120C90", contractObject);
  const { mutateAsync: proposeWithOffers, isLoading } = useContractWrite(contract, "proposeWithOffers");
  // const targets = ["0x3b3B71Ac06e90f9D4D70B9485625e4Dfc8807900"];
  const targets = ["0x2B38BA2E0C8251D02b61C4DFBEe161dbb6AE3e66"];
  const values = [5];
  // const calldatas = ["0x4554480000000000000000000000000000000000000000000000000000000000"];
  // TODO calldatasの生成
  // プレーンのmethod nameを定義
  // 引数をstringで生成
  // プレーンmethod name と 引数のstringを２つ合わせてエンコード
  // エンコードの文字列からmethod idを特定
  // 引数の文字列をエンコード
  // medhod idとエンコードした引数の文字列を連結
  const calldatas = ["0x4554480000000000000000000000000000000000000000000000000000000000"];
  // const description = "test5"; // TODO: { title: string, description: string }の形のjson形式で投げるようにする
  // const offers = ["", ""]; // TODO: offerする企業名のリスト
  const callPropose = async (description: string, offers: Array<string>) => {
    try {
      const data = await proposeWithOffers({ args: [targets, values, calldatas, description, offers] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      offers: [],
    } as ProposalRequestParam,
    onSubmit: (values: ProposalRequestParam) => {
      console.log(values);
      const paramOffers = values.offers.filter((offer) => {
        return offer != "";
      });
      const paramDescriptionObject = {
        title: values.title,
        description: values.description
      };
      const paramDescriptionJsonText = JSON.stringify(paramDescriptionObject);
      callPropose(paramDescriptionJsonText, paramOffers);
    },
  });

  return (
    <PageTemplate>
      <PageTitle>
        Create Proposal
      </PageTitle>
      <form onSubmit={formik.handleSubmit}>
        <CreateProposalArea>
          <div>
            <FormLine>
              {getFormTitle("TITLE")}
              <TitleTextForm id="title" value={formik.values.title} onChange={formik.handleChange} />
            </FormLine>
            <FormLine>
              {getFormTitle("DESCRIPTION")}
              <DescriptionTextAreaForm id="description" value={formik.values.description} onChange={formik.handleChange} />
            </FormLine>
            <FormLine>
              {getFormTitle("OFFER")}
              <OfferTextForm id="offers[0]" type="text" value={formik.values.offers[0]} onChange={formik.handleChange} />
            </FormLine>
            <FormLine>
              {getFormTitle("")}
              <OfferTextForm id="offers[1]" type="text" value={formik.values.offers[1]} onChange={formik.handleChange} />
            </FormLine>
            <FormLine>
              {getFormTitle("")}
              <OfferTextForm id="offers[2]" type="text" value={formik.values.offers[2]} onChange={formik.handleChange} />
            </FormLine>
          </div>
          <ButtonArea>
            <CreateProposalButton type="submit">
              提案作成
            </CreateProposalButton>
            <BackButton type="button" onClick={() => router.push('/')}>戻る</BackButton>
          </ButtonArea>
        </CreateProposalArea>
      </form>
    </PageTemplate>
  );
};

export default AdminPage;
