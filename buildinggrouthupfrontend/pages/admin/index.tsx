import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { PageTemplate } from "../../components/PageTemplate";
import { useRouter } from "next/router";

const AdminPage: NextPage = () => {
  const router = useRouter();
  return (
    <PageTemplate title={'管理者画面'}>
      <button onClick={() => router.push('/admin/suggest')}>提案を登録する</button>
      <button onClick={() => router.push('/admin/vote')}>投票する</button>
    </PageTemplate>
  );
};

export default AdminPage;
