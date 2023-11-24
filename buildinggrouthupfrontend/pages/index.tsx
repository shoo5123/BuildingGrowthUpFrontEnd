import { PageTemplate } from "../components/PageTemplate";
import { NewsList, NewsProps } from "../components/NewsList";
import { ProposalList, Proposal, ExecuteParam } from "../components/ProposalList";
import { PrizeList, PrizeProps } from "../components/PrizeList";
import ProposalDetailModal from "../components/ProposalDetailModal";
import PrizeDetailModal from "../components/PrizeDetailModal";
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import moment from "moment";
import { Web3 } from "web3";
import contractData from "../contract/custom_abi.json";
import dummyPrizeList from "../resources/mock/dummyPrizeList.json";
import dummyNewsList from "../resources/mock/dummyNewsList.json";

const Components = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewsArea = styled.div`
  height: 300px;
  min-width: 1232px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewsAreaTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProposalAndPrizeArea = styled.div`
  height: 520px;
  width: 1232px;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ProposalArea = styled.div`
  width: 700px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
`;

const ProposalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  padding-left: 8px;
  margin-bottom: 10px;
`;

const ProposalAreaTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const ProposalButton = styled.div`
  height: 32px;
  padding: 4px 8px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px #000000;
  border-radius: 8px;
  background: #FFF7ED;
  &:hover {
    cursor: pointer;
    background: #E5FFCC;
  }
`;

const PrizeArea = styled.div`
  width: 520px;
`;

const PrizeAreaTitle = styled.div`
  height: 34px;
  padding-left: 8px;
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: bold;
`;

const getProposalList = (dataList: Array<any>) => {
  // TODO: 今後startBlock、endBlockはTimeStamp型で返ってくる予定
  const dummyStartDateTimeStamp = new Date(2023,10,11,10,0).getTime();
  const dummyEndDateTimeStamp = new Date(2023,10,22,10,0).getTime();

  // TimeStamp型のstart, endをYYYY-MM-DDのフォーマットに変換
  const startDate = moment(dummyStartDateTimeStamp).format("YYYY-MM-DD");
  const endDate = moment(dummyEndDateTimeStamp).format("YYYY-MM-DD");
  console.log(startDate);
  console.log(endDate);

  return (
    dataList.map((data: any) => {
      // data.descriptionをjson型のオブジェクトにキャスト
      const dataDescription = String(data[2]);
      const parsedDataDescription = JSON.parse(dataDescription);

      // data.targetsをstringのArrayにキャスト
      const dataTargets = data[7] as Array<any>;
      const targets = dataTargets.map(dataTarget => {
        return String(dataTarget);
      });

      // data.valuesをnumberのArrayにキャスト
      const dataValues = data[8] as Array<any>;
      const values = dataValues.map(dataValue => {
        return Number(dataValue);
      });

      // data.calldatasをstringのArrayにキャスト
      const dataCalldatas = data[9] as Array<any>;
      const calldatas = dataCalldatas.map(dataCalldata => {
        return String(dataCalldata);
      });

      const executeParam: ExecuteParam = {
        targets: targets,
        values: values,
        calldatas: calldatas,
        description: dataDescription,
      }

      const proposal: Proposal = {
        id: Number(data[0]),
        proposalId: String(data[1]),
        title: String(parsedDataDescription.title),
        description: String(parsedDataDescription.description),
        proposer: String(data[3]),
        // start: Number(data.startBlock),
        start: startDate, // TODO: 今後startBlockがタイムスタンプになる予定
        // end: Number(data.endBlock),
        end: endDate, // TODO: 今後endBlockがタイムスタンプになる予定
        status: Number(data[6]),
        executeParam: executeParam,
      }

      return proposal;
  }));
};

// TOP画面
const TopPage: NextPage = () => {
  const router = useRouter();
  const address = useAddress();

  // ThirdWebからcontractを取得
  const contractJsonData = JSON.stringify(contractData);
  const contractObject = JSON.parse(contractJsonData);
  const { contract } = useContract("0xEe9510E3579Ba31ca96b213dCe077f5c66b17c19", contractObject); // new Contract

  // contractからProposalのデータを取得
  const { data: proposalResponse, isLoading: isLoadingGetProposal } = useContractRead(contract, "getAllProjectProposals");
  // chainから取得したProposalのデータをフロント川のProposalのオブジェクトに詰め替える
  const proposalList = isLoadingGetProposal ? [] : getProposalList(proposalResponse);
  console.log(proposalList);

  // Prizeのデータを取得 TODO: PrizeList取得は将来的に実装(現状はダミーデータを使用する)
  const dummyPrizeListData = JSON.stringify(dummyPrizeList);
  const prizeList: Array<PrizeProps> = JSON.parse(dummyPrizeListData);

  // Prizeのデータを取得 TODO: PrizeList取得は将来的に実装(現状はダミーデータを使用する)
  const dummyNewsListData = JSON.stringify(dummyNewsList);
  const newsList: Array<NewsProps> = JSON.parse(dummyNewsListData);

  // 投票関数
  const { mutateAsync: castVote, isLoading: isLoadingCallCastVote } = useContractWrite(contract, "castVote");
  const callCastVote = async (proposalId: string, support: number) => {
    try {
      const castVoteResult = await castVote({ args: [proposalId, support] });
      console.log("call castVote success", castVoteResult);
    } catch (e) {
      console.error("call castVote failure", e);
    }
  }

  // 投票済みフラグ取得
  const getHasVoted = (proposalId: string) => {
    const { data: hasVoted } = useContractRead(contract, "hasVoted", [proposalId, address]);
    return hasVoted;
  }

  const createHashedDescription = (paramDescription: string) => {
    const web3 = new Web3();
    const hexDescription = web3.utils.utf8ToHex(paramDescription);
    const hashedDescription = web3.utils.soliditySha3(hexDescription);

    return hashedDescription;
  }

  // execute実行
  const { mutateAsync: execute, isLoading: isLoadingCallExecute } = useContractWrite(contract, "execute");
  const callExecute = async (proposal: Proposal) => {
    const param = proposal.executeParam;
    try {
      // const executeResult = await execute({ args: [proposalId] });
      const executeResult = await execute({ args: [param.targets, param.values, param.calldatas, createHashedDescription(param.description)] });
      console.log("call execute success", executeResult);
    } catch (e) {
      console.error("call castVote failure", e);
    }
  }

  // 詳細表示中のProposal
  const [selectedProposalId, setSelectedProposalId] = useState<number | undefined>(undefined);
  const selectedProposal = proposalList.find((proposal) => proposal.id == selectedProposalId);

  // 詳細表示中のPrize
  const [selectedPrizeId, setSelectedPrizeId] = useState<number | undefined>(undefined);
  const selectedPrize = prizeList.find((prize) => prize.prizeId == selectedPrizeId);

  return (
    <>
      <PageTemplate>
        <Components>
          <NewsArea>
            <NewsAreaTitle>
              Pick Up News!
            </NewsAreaTitle>
            <NewsList newsList={newsList} />
          </NewsArea>
          <ProposalAndPrizeArea>
            <ProposalArea>
              <ProposalHeader>
                <ProposalAreaTitle>
                  Proposals
                </ProposalAreaTitle>
                <ProposalButton onClick={() => router.push('/admin')}>提案を提出</ProposalButton>
              </ProposalHeader>
              <ProposalList proposalList={proposalList} changeOpenProposalModal={setSelectedProposalId} />
            </ProposalArea>
            <PrizeArea>
              <PrizeAreaTitle>
                PrizeArea
              </PrizeAreaTitle>
              <PrizeList prizeList={prizeList} changeOpenPrizeModal={setSelectedPrizeId} />
            </PrizeArea>
          </ProposalAndPrizeArea>
        </Components>
      </PageTemplate>
      <ProposalDetailModal
        selectedProposal={selectedProposal}
        setSelectedProposalId={setSelectedProposalId}
        castVote={callCastVote}
        getHasVoted={getHasVoted}
        execute={callExecute}
      />
      <PrizeDetailModal selectedPrize={selectedPrize} setSelectedPrizeId={setSelectedPrizeId} />
    </>
  );
};

export default TopPage;
