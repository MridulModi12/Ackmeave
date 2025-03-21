"use client";

import { useParams } from 'next/navigation';
import { useState } from 'react';

const ShareButton = () => {
  const params = useParams();
  const roomId = params.id as string;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={copyToClipboard}>
      <div>Share Icon</div>
      {copied && <span className="ml-2 text-green-500 text-sm">Copied!</span>}
    </div>
  );
};

export default ShareButton;
