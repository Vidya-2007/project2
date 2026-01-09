const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.10.1/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const FromCurr=document.querySelector(".From select");
const ToCurr=document.querySelector(".To select");
const msg=document.querySelector(".msg");

for (let select of dropdowns){
    for(currCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        if(select.name==="From" && currCode==="USD"){
            newoption.selected="selected";
        }else if(select.name==="To" && currCode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if (amtVal===" " || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    //console.log(FromCurr.value,ToCurr.value);
    const URL = `${BASE_URL}/${FromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate = data[FromCurr.value.toLowerCase()][ToCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${FromCurr.value}=${finalAmount} ${ToCurr.value}`;

});
