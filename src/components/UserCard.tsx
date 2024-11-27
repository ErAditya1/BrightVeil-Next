import ValidatedImage from '@/components/ValidatedImage';

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="bg-card text-card-foreground rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-popover px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <ValidatedImage src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-sm font-medium aaa">{type}s</h2>
    </div>
  );
};

export default UserCard;
