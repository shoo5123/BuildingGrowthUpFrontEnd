import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { PageTemplate } from "../../components/PageTemplate";
import { useRouter } from "next/router";

const StatusPage: NextPage = () => {
  const router = useRouter();
  return (
    <PageTemplate title={'ステータス画面'}>
    </PageTemplate>
  );
};

export default StatusPage;
