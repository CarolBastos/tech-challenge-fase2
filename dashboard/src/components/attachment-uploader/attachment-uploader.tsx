"use client";

import React, { useState } from "react";
import styles from "./attachment-uploader.module.scss";

interface AttachmentUploaderProps {
    onFileSelect: (file: File | null) => void;
}

const AttachmentUploader: React.FC<AttachmentUploaderProps> = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onFileSelect(file);
    } else {
        console.log("limpou")
      setFileName(null);
      onFileSelect(null);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="attachment" className="font-inter font-semibold text-sm text-tertiary-300 text-center md:text-left">
        Anexo
      </label>
      <input
        type="file"
        id="attachment"
        accept=".png,.jpg,.jpeg"
        onChange={handleFileChange}
        className={styles["input-file"]}
      />
      {fileName && (
        <p className="text-sm text-gray-600 mt-1">Arquivo selecionado: {fileName}</p>
      )}
    </div>
  );
};

export default AttachmentUploader;
