import { NewsType } from "../const/NewsType";
import styled from "styled-components";
import {
  FaSeedling as SeedIcon,
  FaTree as TreeIcon,
} from "react-icons/fa";

const NewsListArea = styled.div`
  width: 760px;
  overflow: auto;
`;

const NewsLine = styled.div`
  height: 36px;
  display: flex;
  padding: 0px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
    background-color: #E5FFCC;
  }
`;

const NewsIconAndDescriptionArea =styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconArea = styled.div`
  padding: 8px;
`;

const DescriptionArea = styled.div`
  margin-left: 8px;
  font-size: 20px;
`;

const ICON_SIZE = 20;

interface Props {
  newsList: Array<NewsProps>;
}

export interface NewsProps {
  newsId: number;
  newsType: NewsType;
  description: string;
  listingDate: string;
}

const getNewsIcon = (type: NewsType) => {
  if (type == "new") {
    return (
      <SeedIcon size={`${ICON_SIZE}px`} color="#228B22" />
    );
  } else {
    return (
      <TreeIcon size={`${ICON_SIZE}px`} color="#228B22" />
    )
  }
}

export const NewsList: React.FC<Props> = ({ newsList }) => {
  return (
    <NewsListArea>
      {newsList.map((news) => {
        return (
          <NewsLine key={news.newsId}>
            <NewsIconAndDescriptionArea>
              <IconArea>
                {getNewsIcon(news.newsType)}
              </IconArea>
              <DescriptionArea>
                {news.description}
              </DescriptionArea>
            </NewsIconAndDescriptionArea>
            <div>{news.listingDate}</div>
          </NewsLine>
        );
      })}
    </NewsListArea>
  );
};
