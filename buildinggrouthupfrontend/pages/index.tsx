import { PageTemplate } from "../components/PageTemplate";
import { NewsList, NewsProps } from "../components/NewsList";
import { ProposalList, Proposal } from "../components/ProposalList";
import { PrizeList, PrizeProps } from "../components/PrizeList";
import ProposalDetailModal from "../components/ProposalDetailModal";
import PrizeDetailModal from "../components/PrizeDetailModal";
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import contractData from "../contract/custom_abi.json";

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

// const dummyDate = moment().format('YYYY-MM-DD HH:mm');
const dummyDate = "2023-11-20 01:00";

const dummyNewsList: Array<NewsProps> = [
  {
    newsId: 1,
    newsType: "new",
    description: "クリスマスイベントが開催されるかも・・",
    listingDate: dummyDate,
  },
  {
    newsId: 2,
    newsType: "done",
    description: "ハロウィンイベントが大盛況でした！",
    listingDate: dummyDate,
  },
  {
    newsId: 3,
    newsType: "new",
    description: "エレベーターの混雑が緩和されるかも！^^",
    listingDate: dummyDate,
  },
  {
    newsId: 4,
    newsType: "done",
    description: "A社とB社の共同展覧会が開催されました！",
    listingDate: dummyDate,
  },
  {
    newsId: 5,
    newsType: "new",
    description: "お正月のおせちをみんなで作りませんか？",
    listingDate: dummyDate,
  },
  {
    newsId: 6,
    newsType: "done",
    description: "上期の大感謝セールの口コミが大好評でした！",
    listingDate: dummyDate,
  },
  {
    newsId: 7,
    newsType: "new",
    description: "日曜日のカフェ難民を皆さんで救いましょう！",
    listingDate: dummyDate,
  },
  {
    newsId: 8,
    newsType: "done",
    description: "ショーケースイベントにD社とE社で参加しました！",
    listingDate: dummyDate,
  },
]

const dummyPrizeList: Array<PrizeProps> = [
  {
    prizeId: 1,
    title: "aaaaa",
    imageUrl: "../images/image1.png",
    description: "ああああああああああああああああああ",
    prizeFruit: 10,
  },
  {
    prizeId: 2,
    title: "bbbbb",
    imageUrl: "../images/image2.png",
    description: "いいいいいいいいいいいいいいいいいい",
    prizeFruit: 20,
  },
  {
    prizeId: 3,
    title: "ccccc",
    imageUrl: "../images/image3.png",
    description: "うううううううううううううううううう",
    prizeFruit: 30,
  },
  {
    prizeId: 4,
    title: "ddddd",
    imageUrl: "../images/image4.png",
    description: "ええええええええええええええええええ",
    prizeFruit: 40,
  },
  {
    prizeId: 5,
    title: "aaaaa",
    imageUrl: "../images/image1.png",
    description: "ああああああああああああああああああ",
    prizeFruit: 10,
  },
  {
    prizeId: 6,
    title: "bbbbb",
    imageUrl: "../images/image2.png",
    description: "いいいいいいいいいいいいいいいいいい",
    prizeFruit: 20,
  },
  {
    prizeId: 7,
    title: "ccccc",
    imageUrl: "../images/image3.png",
    description: "うううううううううううううううううう",
    prizeFruit: 30,
  },
  {
    prizeId: 8,
    title: "ddddd",
    imageUrl: "../images/image4.png",
    description: "ええええええええええええええええええ",
    prizeFruit: 40,
  },
];

const getProposalList = (dataList: Array<any>) => {
  return (
    dataList.map((data: any) => {
      const dataDescription = String(data.description);
      const parsedDataDescription = JSON.parse(dataDescription);
      const proposal: Proposal = {
        id: Number(data.id),
        proposalId: String(data.proposalId),
        title: String(parsedDataDescription.title),
        description: String(parsedDataDescription.description),
        proposer: String(data.proposer),
        start: Number(data.startBlock),
        end: Number(data.endBlock),
        status: Number(data.status),
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
  const { contract } = useContract("0x63F4a29Bb25920E563144bbbcE4B15f8D1120C90", contractObject); // new Contract

  // contractからProposalのデータを取得
  const { data: proposalResponse, isLoading: isLoadingGetProposal } = useContractRead(contract, "getAllProjectProposals");
  // chainから取得したProposalのデータをフロント川のProposalのオブジェクトに詰め替える
  const proposalList = isLoadingGetProposal ? [] : getProposalList(proposalResponse);
  console.log(proposalList);

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

  // 詳細表示中のProposal
  const [selectedProposalId, setSelectedProposalId] = useState<number | undefined>(undefined);
  const selectedProposal = proposalList.find((proposal) => proposal.id == selectedProposalId);

  // 詳細表示中のPrize
  const [selectedPrizeId, setSelectedPrizeId] = useState<number | undefined>(undefined);
  const selectedPrize = dummyPrizeList.find((prize) => prize.prizeId == selectedPrizeId);

  return (
    <>
      <PageTemplate>
        <Components>
          <NewsArea>
            <NewsAreaTitle>
              Pick Up News!
            </NewsAreaTitle>
            <NewsList newsList={dummyNewsList} />
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
              <PrizeList prizeList={dummyPrizeList} changeOpenPrizeModal={setSelectedPrizeId} />
            </PrizeArea>
          </ProposalAndPrizeArea>
        </Components>
      </PageTemplate>
      <ProposalDetailModal
        selectedProposal={selectedProposal}
        setSelectedProposalId={setSelectedProposalId}
        castVote={callCastVote}
        getHasVoted={getHasVoted}
      />
      <PrizeDetailModal selectedPrize={selectedPrize} setSelectedPrizeId={setSelectedPrizeId} />
    </>
  );
};

export default TopPage;
