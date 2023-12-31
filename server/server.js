const OpenAI = require('openai').default;
require('dotenv').config();
const prompt_reqs = require('./prompt_reqs.json');
const express = require("express");
const fs = require('fs');
const pdf = require('pdf-parse');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const MESSAGE = prompt_reqs.messages['bt-prompt'];
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(fileUpload());
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//end point
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

  app.post("/submit-data", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
 // 'pdfFile' should match the name attribute in your frontend file input
    const pdfFile = req.files.pdfFile; 

    pdf(pdfFile.data)
      .then(async data => {
        console.log("PDF Text:", data.text); 
        res.json({ message: "PDF processed successfully", text: data.text });

        try{
          const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `${MESSAGE}`+'\n'+data.text}],
            model: 'gpt-3.5-turbo',
          });

          console.log("Chat Completion Response:", chatCompletion);

        } catch(error){
          console.error("Error with OpenAI:", error);
          res.status(500).send("Error with OpenAI");
        }
        

      })
      .catch(error => {
        console.error("Error processing PDF:", error);
        res.status(500).send("Error processing PDF");
      });
  });