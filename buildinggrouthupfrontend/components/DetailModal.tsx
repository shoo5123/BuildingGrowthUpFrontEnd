import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";

const Sample: NextPage = () => {
  return (
    <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to Sample !!
      </h1>
      <div className={styles.connect}>
        {/* <ConnectWallet /> */}
      </div>
    </main>
  </div>
  );
};

export default Sample;
