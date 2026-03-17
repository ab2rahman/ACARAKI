import React from 'react';
import Image from 'next/image';

const FileInput = ({ 
  id, 
  name, 
  onChange, 
  selectedFile, 
  placeholder = 'Pilih File',
  className = '',
  accept = '*/*',
  sampleImage = null
}) => {
  return (
    <div className="relative flex items-start gap-x-4">
      <div className="flex-1">
        <input 
          type="file" 
          id={id} 
          name={name} 
          className="hidden"
          onChange={onChange}
          accept={accept}
        />
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id).click();
          }}
          className={`${className} btn-upload`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} viewBox="0 0 25 24" fill="none">
            <path d="M13.5 19V15H16.5L12.5 10L8.5 15H11.5V19H13.5Z" fill="#5A5A5A" />
            <path d="M7.5 19H9.5V17H7.5C5.846 17 4.5 15.654 4.5 14C4.5 12.596 5.699 11.244 7.173 10.985L7.754 10.883L7.946 10.325C8.649 8.274 10.395 7 12.5 7C15.257 7 17.5 9.243 17.5 12V13H18.5C19.603 13 20.5 13.897 20.5 15C20.5 16.103 19.603 17 18.5 17H15.5V19H18.5C20.706 19 22.5 17.206 22.5 15C22.4985 14.1036 22.1966 13.2336 21.6427 12.5288C21.0888 11.8241 20.3147 11.3253 19.444 11.112C19.007 7.67 16.06 5 12.5 5C9.744 5 7.35 6.611 6.257 9.15C4.109 9.792 2.5 11.82 2.5 14C2.5 16.757 4.743 19 7.5 19Z" fill="#5A5A5A" />
          </svg>
          Unggah File
        </button>
        <div className="text-black text-[12px] mt-2 w-fit">Ukuran file maksimal 5MB</div>
        {selectedFile && (
          <p className="text-black mt-3 text-[14px] font-normal bg-[#F5F5F5] px-3 py-1.5 rounded-md w-fit">
            {selectedFile.name}
          </p>
        )}
      </div>
      {sampleImage && (
        <div className="w-[100px] h-[100px] relative rounded-md overflow-hidden border border-[#C2C2C2]">
          <Image 
            src={sampleImage} 
            alt="Sample" 
            fill 
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default FileInput; 