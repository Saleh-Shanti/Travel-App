const book=document.getElementById('Check-form');

// To select the close btn
const close=document.querySelector('.backBtn')


// To remove the recent weather status divs
const removeDiv=(div)=>
{
  div.forEach(e=>{  e.parentElement.removeChild(e);
})}


// Close the weather status Div

close.addEventListener('click',(e)=>{
  e.preventDefault();
  let div=document.querySelectorAll('.day-weather')
  removeDiv(div);
  let result=document.querySelector('.result');
  result.classList.toggle('hide')
  book.classList.toggle('hide')
})


// Function To create Div for each day
const createDiv=(data)=>
 {
   const div = document.createElement("div");
   div.classList.add("day-weather");
   const icon=document.createElement('img');
   const date=document.createElement('span');
   const status=document.createElement('span');
   const degree=document.createElement('span');
  
   icon.src="/src/client/images/icons/"+data.icon+".png";
   date.innerText=data.date;
   status.innerText=data.status;
   degree.innerText=data.degree;

    div.appendChild(icon);   
   div.appendChild(date);
   div.appendChild(degree);
   div.appendChild(status);
  
return div;
  
}


// Update UI with the weather status
const update = (countryName,DiffDays,data,image,defImg) => 
{
  
  // To show te weather status div
  const result=document.querySelector('.result');
  const imgs=document.querySelector('.imgs');
  result.classList.toggle('hide');
  book.classList.toggle('hide');


// Update Country name
  let name=document.querySelector('.Country-name');
  name.innerHTML=countryName;

  // Update te cover image
  const coverImg=document.getElementById('img')
  if(image!=null)
    { coverImg.style.background=`url(${image})`;}
  else
    {coverImg.style.background=`url(${defImg})`;}  

  coverImg.style.backgroundrepeat= "no-repeat";
  coverImg.style.backgroundSize= 'cover';
//console.log(data);
// Update the daily weather cards
  const weather=document.querySelector('.weather');

  for (let i = 0; i <DiffDays; i++) 
  {
    weather.appendChild(createDiv(data[i]));
    }

}


module.exports = 
{
  update,
}