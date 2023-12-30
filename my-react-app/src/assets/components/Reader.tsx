import './Reader.css';

const fileReader = (files: FileList) => {
  // Iterate over the files in the FileList
  for (let i = 0; i < files.length; i++) {
    const file = files[i];


    const reader = new FileReader();
    reader.onload = (e) => {
      // e.target.result contains the file's content
      const formData = new FormData();
      formData.append('pdfFile', file);
      console.log(`Content of file ${file.name}:`, e.target?.result);

      fetch('http://localhost:3001/submit-data', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'text/plain',
        // },
         body: formData,//JSON.stringify({ fileData: e.target?.result }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => console.error('Error:', error));
    };
    reader.onerror = (e) => {
      console.error(`Error reading file ${file.name}:`, e.target?.error);
    };
    reader.readAsText(file);
  }
};

export default fileReader;
