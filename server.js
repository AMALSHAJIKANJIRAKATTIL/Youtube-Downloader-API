const axios = require("axios");
const ytdl = require('ytdl-core');
const express =require('express');
const PORT= 8000;
const app =express();

app.get('/download',(req,res)=>{

const id= ytdl.getURLVideoID(req.headers.url);
// console.log(req.params.url);
// console.log(JSON.stringify(req.headers.url));
const options = {
  method: 'GET',
  url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
  params: {id: id},
  headers: {
    'X-RapidAPI-Key': '85e5aed3c0msh8f18e1c59791b4bp1be281jsncf4a1fb5f62d',
    'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
  }
};

 axios.request(options).then(function (response) {
  let arr= response.data.formats;
  let results=[];
  //arr.filter((i)=>{ i.qualityLabel=== 'hd720'})
	arr.map((i,index)=>{ if(i.qualityLabel==='1080p' || i.qualityLabel==='720p' || i.qualityLabel==='480p' || i.qualityLabel==='360p') {results.push(i)}});
  //console.log(results);
  res.status(200).send({...results[results.length-1]});
}).catch(function (error) {
	console.error(error);
});

});

app.get('*',(req,res)=>{
  res.status(404).send({Status:  "Not found"})
})


app.listen(`${PORT}`,()=> console.log(`PORT IS LISTENING ON ${PORT}`));






