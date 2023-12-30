import React, { useCallback, useState } from 'react';
import './FileDrop.css'; 

interface FileDropProps {
  onDrop: (files: FileList) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onDrop }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onDrop(e.dataTransfer.files);
        e.dataTransfer.clearData();
      }
    },
    [onDrop]
  );

  return (
    <div
      className={`fileDropContainer ${isDragOver ? 'fileDropDraggingOver' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      Drag and drop files here or click to select files
    </div>
  );
};

export default FileDrop;
