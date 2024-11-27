"use client";
import ValidatedImage from '@/components/ValidatedImage';

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

const Performance = () => {
  return (
    <div className="bg-card text-card-foreground p-4 rounded-md h-80 relative">
      Performance Chart
    </div>
  );
};

export default Performance;
