import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { PageTemplate } from "../../../components/PageTemplate";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const SuggestPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <PageTemplate title={'管理者画面 提案'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="textArea">テキストエリア</label>
          <textarea id="textArea" {...register('textArea')} />
        </div>
        <button type="submit">登録する</button>
        <button onClick={() => router.push('/admin')}>戻る</button>
      </form>
    </PageTemplate>
  );
};

export default SuggestPage;
