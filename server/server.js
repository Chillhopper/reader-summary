const express = require("express");
const fs = require('fs');
const pdf = require('pdf-parse');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(fileUpload());

//end point
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// app.post("/submit-data", (req, res) => {
//     const data = req.body; 
//     console.log("Received data:", data);
    
  
//     res.json({ message: "Data received successfully" });
//   });

  app.post("/submit-data", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // Get the uploaded file
    const pdfFile = req.files.pdfFile; // 'pdfFile' should match the name attribute in your frontend file input
  
    // Use pdf-parse to extract text from the uploaded file
    pdf(pdfFile.data)
      .then(data => {
        console.log("PDF Text:", data.text); // Log the text content of the PDF
        res.json({ message: "PDF processed successfully", text: data.text });
      })
      .catch(error => {
        console.error("Error processing PDF:", error);
        res.status(500).send("Error processing PDF");
      });
  });