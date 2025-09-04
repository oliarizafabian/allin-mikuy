
import React from 'react';
import type { FooterInfoProps } from '../types';
import SimpleMarkdownRenderer from './SimpleMarkdownRenderer';

const FooterInfo: React.FC<FooterInfoProps> = ({ nutritionalInfo, isLoading }) => {
  if (isLoading || !nutritionalInfo) {
    return null;
  }

  return (
    <footer className="mt-8 pt-6 border-t border-gray-200">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
         <SimpleMarkdownRenderer content={nutritionalInfo} />
      </div>
    </footer>
  );
};

export default FooterInfo;
