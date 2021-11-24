const { handleSubmit } = require('./js/submitHandler');
const { dateCheck } =require( './js/dateCheck');
const { minDate } =require('./js/minDate');


require('./styles/resets.scss');
require('./styles/base.scss');
require('./styles/footer.scss');
require('./styles/form.scss');
require('./styles/header.scss');


const btn=document.querySelector("#Submit");
btn.addEventListener('click',handleSubmit);

 module.exports = {
   handleSubmit,
   dateCheck,
   minDate
 };




