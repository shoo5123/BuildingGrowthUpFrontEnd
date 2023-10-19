import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { PageTemplate } from "../../components/PageTemplate";
import { useRouter } from "next/router";

const PrizePage: NextPage = () => {
  const router = useRouter();
  return (
    <PageTemplate title={'景品画面'}>
    </PageTemplate>
  );
};

export default PrizePage;
