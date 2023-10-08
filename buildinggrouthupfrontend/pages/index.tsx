import { ConnectWallet, useChain } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";

const Home: NextPage = () => {
  const chain = useChain();
  console.log(chain);
  return (
    <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to CompanyDAO !!
      </h1>
      <div className={styles.connect}>
        <ConnectWallet />
      </div>
    </main>
  </div>
  );
};

export default Home;
