import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { GiFruitBowl as FruitIcon } from "react-icons/gi";

const HeaderTemplate = styled.div`
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #A68E74;
`;

const PageIconAndTitleArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PageIcon = styled.div`
  height: 48px;
  width: 48px;
  margin-left: 24px;
`;

const PageTitle = styled.div`
  font-size: 48px;
  font-weight: bold;
`;

const PageRouterAndAccountArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PageRouterArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PageRouterButton = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 8px;
  width: 112px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: #E5FFCC;
  }
`;

const AccountArea = styled.div`
  margin: 0px 8px;
`;

const AccountAddress = styled.div`
  width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TokenComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TokenCount = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #F5EF6C;
  margin-left: 8px;
`;

const BodyTemplate = styled.div`
  padding: 24px;
`;

interface Props {
  children: React.ReactNode;
}

export const PageTemplate: React.FC<Props> = ({ children }) => {
  const address = useAddress();
  const router = useRouter();
  return (
    <>
      <HeaderTemplate>
        <PageIconAndTitleArea>
          <PageIcon>Icon</PageIcon>
          <PageTitle>GROWTH UP</PageTitle>
        </PageIconAndTitleArea>
        <PageRouterAndAccountArea>
          <PageRouterArea>
            <ConnectWallet />
            <PageRouterButton onClick={() => router.push('/')}>Top</PageRouterButton>
            <PageRouterButton onClick={() => router.push('/admin')}>Admin</PageRouterButton>
          </PageRouterArea>
          <AccountArea>
            <AccountAddress>{address}</AccountAddress>
            <TokenComponent>
              <FruitIcon size="18px" color="#F5EF6C"/>
              <TokenCount>30</TokenCount>
            </TokenComponent>
          </AccountArea>
        </PageRouterAndAccountArea>
      </HeaderTemplate>
      <BodyTemplate>
        {children}
      </BodyTemplate>
    </>
  );
};
