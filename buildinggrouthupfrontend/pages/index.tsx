import { PageTemplate } from "../components/PageTemplate";
import { NewsList, NewsProps } from "../components/NewsList";
import { SuggestList, SuggestProps } from "../components/SuggestList";
import { PrizeList, PrizeProps } from "../components/PrizeList";
import { NextPage } from "next";
import styled from "styled-components";
import moment from "moment";

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

const NewsListArea = styled.div`
  border: solid 1px #000000;
  width: 720px;
`;

const SuggestsAndPrizeArea = styled.div`
  height: 520px;
  width: 1232px;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SuggestsArea = styled.div`
  width: 700px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
`;

const SuggestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  padding-left: 8px;
  margin-bottom: 10px;
`;

const SuggestsAreaTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const SuggestButton = styled.div`
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

const dummyDate = moment().format('YYYY-MM-DD HH:mm');

const dummyNewsList: Array<NewsProps> = [
  {
    newsType: "new",
    description: "クリスマスイベントが開催されるかも・・",
    listingDate: dummyDate,
  },
  {
    newsType: "done",
    description: "ハロウィンイベントが大盛況でした！",
    listingDate: dummyDate,
  },
  {
    newsType: "new",
    description: "エレベーターの混雑が緩和されるかも！^^",
    listingDate: dummyDate,
  },
  {
    newsType: "done",
    description: "A社とB社の共同展覧会が開催されました！",
    listingDate: dummyDate,
  },
  {
    newsType: "new",
    description: "お正月のおせちをみんなで作りませんか？",
    listingDate: dummyDate,
  },
  {
    newsType: "done",
    description: "上期の大感謝セールの口コミが大好評でした！",
    listingDate: dummyDate,
  },
  {
    newsType: "new",
    description: "日曜日のカフェ難民を皆さんで救いましょう！",
    listingDate: dummyDate,
  },
  {
    newsType: "done",
    description: "ショーケースイベントにD社とE社で参加しました！",
    listingDate: dummyDate,
  },
]

const dummySuggestList: Array<SuggestProps> = [
  {
    title: "aaa",
    status: "new",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "bbb",
    status: "voting",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "ccc",
    status: "doing",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "ddd",
    status: "reject",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "eee",
    status: "done",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "aaa",
    status: "new",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "bbb",
    status: "voting",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "ccc",
    status: "doing",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "ddd",
    status: "reject",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "eee",
    status: "done",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "aaa",
    status: "new",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "bbb",
    status: "voting",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "ccc",
    status: "doing",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "ddd",
    status: "reject",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
  {
    title: "eee",
    status: "done",
    startDate: dummyDate,
    endDate: dummyDate,
    description: "description",
  },
];

const dummyPrizeList: Array<PrizeProps> = [
  {
    imageUrl: "",
    description: "",
    prizeFruit: 10,
  },
];

// TOP画面
const TopPage: NextPage = () => {
  return (
    <PageTemplate>
      <Components>
        <NewsArea>
          <NewsAreaTitle>
            Pick Up News!
          </NewsAreaTitle>
          <NewsList newsList={dummyNewsList} />
        </NewsArea>
        <SuggestsAndPrizeArea>
          <SuggestsArea>
            <SuggestHeader>
              <SuggestsAreaTitle>
                Suggests
              </SuggestsAreaTitle>
              <SuggestButton onClick={() => window.confirm("TODO: モーダルを表示")}>提案を提出</SuggestButton>
            </SuggestHeader>
            <SuggestList suggestList={dummySuggestList} />
          </SuggestsArea>
          <PrizeArea>
            <PrizeAreaTitle>
              PrizeArea
            </PrizeAreaTitle>
            <PrizeList prizeList={dummyPrizeList} />
          </PrizeArea>
        </SuggestsAndPrizeArea>
      </Components>
    </PageTemplate>
  );
};

export default TopPage;
