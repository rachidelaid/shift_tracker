"use client";

import { useZxing } from "react-zxing";

const Scanner = ({ onScan }: { onScan: (str: string) => void }) => {
  const { ref } = useZxing({
    onResult(result) {
      onScan(result.getText());
    },
  });

  return (
    <div className="relative border-2 border-secondary">
      <video ref={ref} width={500} height={500} />
      <div className="h-1 absolute w-full bg-secondary/70 top-1 scan-animation"></div>
    </div>
  );
};

export default Scanner;
