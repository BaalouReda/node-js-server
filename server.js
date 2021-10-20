const fetch = require('node-fetch');
 let date = new Date();
 let olddate = new Date(date.setMonth(date.getMonth()-1)).toISOString().slice(0, 10);

 console.log(olddate);
  fetch(`https://api.github.com/search/repositories?q=created:>${olddate}&sort=stars&order=desc`)
.then((res)=> res.json())
  .then((res)=>{
    try {
      var arrayOfLanguages =[]
      for (let i = 0; i < res.items.length; i++) {
        if (!arrayOfLanguages.includes(`${res.items[i].language}`)) {
          arrayOfLanguages[arrayOfLanguages.length] = res.items[i].language;
        }
      }
      var cmp=0;
      // console.log(arrayOfLanguages);
      for (let i = 0; i < arrayOfLanguages.length; i++) {
        if (arrayOfLanguages[i]==null) {
          continue;
        }  console.log(`the list of repos using  ${arrayOfLanguages[i]} languge :`);
        for (let j = 0; j < res.items.length; j++) {
         
          if (arrayOfLanguages[i]==res.items[j].language) {
            console.log(res.items[j]);
            cmp++;
          }
        }
        console.log(` the ${arrayOfLanguages[i]} language has a total of  ${cmp} repos`)
      }
    
    } catch (error) {
      console.log(error);
    }
 });
