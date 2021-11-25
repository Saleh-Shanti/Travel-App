const { update } = require("./UpdateUI");



const handleSubmit = async (e) => {
  e.preventDefault();


let deptDate = document.querySelector('#startDate').value;
let retDate = document.querySelector('#endDate').value;
let country=document.querySelector('#Country').value;

// Country name Validation|| Not NULL
if(country.length===0){
 alert("Country Must Be Filled")
  return;
}


 // Date Validation

 let DiffDays = Client.dateCheck(deptDate,retDate );

 if (Client.minDate(deptDate) !== true || Client.minDate(retDate) !== true) {
  alert('You must start from today or after.');
  return;
}

fetch ('http://localhost:8081/result', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({country}) 
})
.then (res => {
  return res.json()
})
.then (data => {


  // Validation || must be valid country name
  if (data.location != null) {
      alert("Invalid Country name");
      return;
  }

  else {
      // Weater API doesnt return more tan 15 days weatercast
       if (DiffDays > 15) {
        alert("Maximum days number is 15 days")
        return
      }
      else{
        const weatherData=[];
        data.weather_Data.data.forEach(e=>{
      
                let newData={
                  icon:"",
                  date:"",
                  status:"",
                  degree:""
                };
                newData.icon=e.weather.icon
                newData.date=e.datetime
                newData.status=e.weather.description
                newData.degree=e.temp
                weatherData.push(newData)
              })

              let countryName=data.geonames_Data.geonames[0].name;
              let image=data.pixabay_Data.hits[0].webformatURL
              let defaultImg=data.pixabay_Default.hits[0].webformatURL
             
      update(countryName,DiffDays,weatherData,image,defaultImg)
    }
    }


})
};



module.exports = {
  handleSubmit
};

