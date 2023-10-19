import { useForm } from "react-hook-form";

interface Props {
  voteIndex: number;
  voteLabel: string;
}

export const VoteForm: React.FC<Props> = ({ voteIndex, voteLabel }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>{voteLabel}</p>
      <label htmlFor={`voteCount${voteIndex}`}>投票数</label>
      <input id={`voteCount${voteIndex}`} {...register(`voteCount${voteIndex}`)} />
      <button type="submit">投票</button>
    </form>
  );
};
