'use strict';

const express = require('express');
const languageParser = require('accept-language-parser');
const UAParser = require('ua-parser-js');


const app = express();

app.get('/', (req, res) => {
  const headers = req.headers;
  
  res.send({
    ipaddress: headers['x-forwarded-for'],
    language: parseLanguage(headers['accept-language']),
    software: parseOS(headers['user-agent'])
  });
});

app.listen(process.env.PORT, process.env.IP, () => console.log('Listening'));


function parseLanguage(header) {
  const language = languageParser.parse(header)[0];
  
  let r = language.code;
  
  if(language.region) {
    r += '-' + language.region;
  }
  
  return r;
}

function parseOS(header) {
  const parser = new UAParser();
  
  parser.setUA(header);
  
  const os = parser.getOS();
  
  return `${os.name} ${os.version}`;
}