import './Reader.css';

const fileReader = (files: FileList) => {
  // Iterate over the files in the FileList
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Now you can process each file. For example, you can read them as text.
    const reader = new FileReader();
    reader.onload = (e) => {
      // e.target.result contains the file's content
      console.log(`Content of file ${file.name}:`, e.target.result);
    };
    reader.onerror = (e) => {
      console.error(`Error reading file ${file.name}:`, e.target.error);
    };
    reader.readAsText(file); // Or use readAsDataURL(), readAsArrayBuffer(), etc., depending on your needs
  }
};

export default fileReader;
