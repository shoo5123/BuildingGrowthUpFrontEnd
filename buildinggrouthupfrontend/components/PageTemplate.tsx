import { useRouter } from "next/router";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const PageTemplate: React.FC<Props> = ({ title, children }) => {
  const router = useRouter();
  return (
    <>
      <h1>{`Building Growth UP DAO  ${title}`}</h1>
      <button onClick={() => router.push('/')}>トップ画面</button>
      <button onClick={() => router.push('/admin')}>管理者画面</button>
      <button onClick={() => router.push('/status')}>ステータス画面</button>
      <button onClick={() => router.push('/prize')}>景品画面</button>
      <div>{children}</div>
    </>
  );
};
