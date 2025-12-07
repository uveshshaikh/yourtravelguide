import React from 'react';

interface TagChipProps {
  label: string;
}

const TagChip: React.FC<TagChipProps> = ({ label }) => {
  return <span className="tag-chip mr-2 mb-1">#{label}</span>;
};

export default TagChip;
