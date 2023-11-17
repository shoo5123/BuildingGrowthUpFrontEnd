import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { PageTemplate } from "../../../components/PageTemplate";
import { useForm } from "react-hook-form";
import { VoteForm } from "../../../components/VoteForm";
import { useRouter } from "next/router";

const VotePage: NextPage = () => {
  const router = useRouter();
  return (
    <PageTemplate title={'管理者画面 投票'}>
      <VoteForm
        voteIndex={1}
        voteLabel="提案1"
      />
      <VoteForm
        voteIndex={2}
        voteLabel="提案2"
      />
      <VoteForm
        voteIndex={3}
        voteLabel="提案3"
      />
      <button onClick={() => router.push('/admin')}>戻る</button>
    </PageTemplate>
  );
};

export default VotePage;
