import { ConnectWallet, useChain } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { PageTemplate } from "../components/PageTemplate";
import styled from "styled-components";
import Data from "../resources/mock/suggestList.json";

const SuggestComponents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SuggestComponent = styled.div`
  height: 400px;
`;

const Home: NextPage = () => {
  const chain = useChain();
  console.log(chain?.name);
  const json = Data;
  const convert_json = JSON.stringify(json);
  const dataObj = JSON.parse(convert_json);
  console.log(dataObj);
  return (
    <PageTemplate title={'トップ画面'}>
      <SuggestComponents>
        <SuggestComponent>
          {}
          <div>a</div>
          <div>a</div>
          <div>a</div>
        </SuggestComponent>
        <SuggestComponent>
          <div>a</div>
          <div>a</div>
          <div>a</div>
        </SuggestComponent>
        <SuggestComponent>
          <div>a</div>
          <div>a</div>
          <div>a</div>
        </SuggestComponent>
      </SuggestComponents>
    </PageTemplate>
  );
};

export default Home;
