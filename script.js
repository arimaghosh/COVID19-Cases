$(window).load(function() {
  $(".se-pre-con").fadeOut("20000");;
});

const api=
{
    key:"0b01adbe704feb418a5a2e72236fd26e",
    baseurl:"https://api.openweathermap.org"
};
var covidUrl="https://api.covid19api.com/summary";
fetch(covidUrl)
    .then(cases => {
        return cases.json();
    })
    .then(displayData);
  
    function displayData(cases)
    {
        let totalWconfirmed = document.querySelector('.totalWconfirmed');
        totalWconfirmed.innerText=`${cases.Global.TotalConfirmed}`;
        let newWconfirmed = document.querySelector('.newWconfirmed');
        if(`${cases.Global.NewConfirmed}` != 0)
        {
          newWconfirmed.innerText=`+ ${cases.Global.NewConfirmed}`;
        }
        else
        {
          newWconfirmed.innerText="New Case Data yet not recieved";
        }
        let totalWrecovered = document.querySelector('.totalWrecovered');
        totalWrecovered.innerText=`${cases.Global.TotalRecovered}`;
        let newWrecovered = document.querySelector('.newWrecovered');
        if(`${cases.Global.NewRecovered}` != 0)
        {
          newWrecovered.innerText=`+ ${cases.Global.NewRecovered}`;
        }
        else
        {
          newWrecovered.innerText="New Recovery Data yet not recieved";
        }
        let totalWdeath = document.querySelector('.totalWdeath');
        totalWdeath.innerText=`${cases.Global.TotalDeaths}`;
        let newWdeath = document.querySelector('.newWdeath');
        if(`${cases.Global.NewDeaths}` != 0)
        {
          newWdeath.innerText=`+ ${cases.Global.NewDeaths}`; 
        }
        else
        {
          newWdeath.innerText="New Death Data yet not recieved";
        }
        
        var count_country = cases.Countries;
        var newCases=[];
        var newRecovery=[];
        var newDead=[];
        count_country.forEach(function(element)
        {
          var obj1 = {};
          obj1["name"] = element.Country;
          obj1["new"] = element.NewConfirmed;
          newCases.push(obj1);

          var obj2 = {};
          obj2["name"] = element.Country;
          obj2["new"] = element.NewRecovered;
          newRecovery.push(obj2);

          var obj3 = {};
          obj3["name"] = element.Country;
          obj3["new"] = element.NewDeaths;
          newDead.push(obj3);
        }
      );
      newCases.sort((a, b) => (a.new > b.new) ? -1 : 1);
      newRecovery.sort((a, b) => (a.new > b.new) ? -1 : 1);
      newDead.sort((a, b) => (a.new > b.new) ? -1 : 1);
      var i,c,r,d;
      var sortedCases=[];
      var sortedRecovery=[];
      var sortedDeath=[];
      for(i=0;i<10;i++)
      {
        sortedCases.push(newCases[i]);
        sortedRecovery.push(newRecovery[i]);
        sortedDeath.push(newDead[i]);
      }
      sortedCases.forEach( function(data)
      {
        if(`${data.new}` == 0)
        {
          c=1;
        }
        else
        {
          document.getElementById("top-total").innerHTML += 
          `<li><span class="text-info">${data.name}</span> - ${data.new}</li>`;
        }
      }); 
      if(c==1)
      {
        document.getElementById("top-total").innerText="No Data available";
      }
      sortedRecovery.forEach( function(data)
      {
        if(`${data.new}` == 0)
        {
          r=1;
        }
        else
        {
        document.getElementById("top-recovery").innerHTML += 
        `<li><span class="text-info">${data.name}</span> - ${data.new}</li>`;
        }
      }); 
      if(r==1)
      {
        document.getElementById("top-recovery").innerText="No Recovery Data available";
      }
      sortedDeath.forEach( function(data)
      {
        if(`${data.new}` == 0)
        {
          d=1
        }
        else
        {
        document.getElementById("top-dead").innerHTML += 
        `<li><span class="text-info">${data.name}</span> - ${data.new}</li>`;
        }
      }); 
      if(d==1)
      {
        document.getElementById("top-dead").innerText="No Death Data available";
      }
  }


window.addEventListener('load',()=>{
    let long;
    let lat;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition
        (position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            fetch(`${api.baseurl}/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`)
            .then(weather =>{
            return weather.json();
            })
            .then(displayCountryData);
         })
     }
});

function displayCountryData(weather)
{
  var countryW=`${weather.sys.country}`;
  fetch(covidUrl)
    .then(casesC => {
        return casesC.json();
    })
    .then(displayCData);

    function displayCData(casesC)
  {
    var countryName = casesC.Countries;
      countryName.forEach(function(element){
          if(element.CountryCode === countryW)
          {
            var name = document.querySelector('.country .name');
            name.innerText=element.Country;
            var confirmedValue= document.querySelector('.total-cases .value');
            confirmedValue.innerText=element.TotalConfirmed;
            var newValue = document.querySelector('.total-cases .new-value');
            newValue.innerText="+"+element.NewConfirmed;
            var recoveredValue = document.querySelector('.recovered .value');
            recoveredValue.innerText=element.TotalRecovered;
            var recoveredNewValue = document.querySelector('.recovered .new-value');
            recoveredNewValue.innerText="+"+element.NewRecovered;
            var deathValue = document.querySelector('.death .value');
            deathValue.innerText=element.TotalDeaths;
            var deathNewValue = document.querySelector('.death .new-value');
            deathNewValue.innerText="+"+element.NewDeaths;
          }
      });
  } 
}

let country_list = 
[
  {name: "Afghanistan", code: "AF"},
  {name: "Albania", code: "AL"},
  {name: "Algeria", code: "DZ"},
  {name: "Andorra", code: "AD"},
  {name: "Angola", code: "AO"},
  {name: "Antigua and Barbuda", code: "AG"},
  {name: "Argentina", code: "AR"},
  {name: "Armenia", code: "AM"},
  {name: "Australia", code: "AU"},
  {name: "Austria", code: "AT"},
  {name: "Azerbaijan", code: "AZ"},
  {name: "Bahamas", code: "BS"},
  {name: "Bahrain", code: "BH"},
  {name: "Bangladesh", code: "BD"},
  {name: "Barbados", code: "BB"},
  {name: "Belarus", code: "BY"},
  {name: "Belgium", code: "BE"},
  {name: "Belize", code: "BZ"},
  {name: "Benin", code: "BJ"},
  {name: "Bhutan", code: "BT"},
  {name: "Bolivia", code: "BO"},
  {name: "Bosnia and Herzegovina", code: "BA"},
  {name: "Botswana", code: "BW"},
  {name: "Brazil", code: "BR"},
  {name: "Brunei Darussalam", code: "BN"},
  {name: "Bulgaria", code: "BG"},
  {name: "Burkina Faso", code: "BF"},
  {name: "Burundi", code: "BI"},
  {name: "Cambodia", code: "KH"},
  {name: "Cameroon", code: "CM"},
  {name: "Canada", code: "CA"},
  {name: "Cape Verde", code: "CV"},
  {name: "Central African Republic", code: "CF"},
  {name: "Chad", code: "TD"},
  {name: "Chile", code: "CL"},
  {name: "China", code: "CN"},
  {name: "Colombia", code: "CO"},
  {name: "Comoros", code: "KM"},
  {name: "Congo (Brazzaville)", code: "CG"},
  {name: "Congo (Kinshasa)", code: "CD"},
  {name: "Costa Rica", code: "CR"},
  {name: "Croatia", code: "HR"},
  {name: "Cuba", code: "CU"},
  {name: "Cyprus", code: "CY"},
  {name: "Czech Republic", code: "CZ"},
  {name: "Côte d'Ivoire", code: "CI"},
  {name: "Denmark", code: "DK"},
  {name: "Djibouti", code: "DJ"},
  {name: "Dominica", code: "DM"},
  {name: "Dominican Republic (the)", code: "DO"},
  {name: "Ecuador", code: "EC"},
  {name: "Egypt", code: "EG"},
  {name: "El Salvador", code: "SV"},
  {name: "Equatorial Guinea", code: "GQ"},
  {name: "Eritrea", code: "ER"},
  {name: "Estonia", code: "EE"},
  {name: "Eswatini", code: "SZ"},
  {name: "Ethiopia", code: "ET"},
  {name: "Falkland Islands (Malvinas)", code: "FK"},
  {name: "Faroe Islands", code: "FO"},
  {name: "Fiji", code: "FJ"},
  {name: "Finland", code: "FI"},
  {name: "France", code: "FR"},
  {name: "French Guiana", code: "GF"},
  {name: "French Polynesia", code: "PF"},
  {name: "French Southern Territories", code: "TF"},
  {name: "Gabon", code: "GA"},
  {name: "Gambia", code: "GM"},
  {name: "Georgia", code: "GE"},
  {name: "Germany", code: "DE"},
  {name: "Ghana", code: "GH"},
  {name: "Gibraltar", code: "GI"},
  {name: "Greece", code: "GR"},
  {name: "Greenland", code: "GL"},
  {name: "Grenada", code: "GD"},
  {name: "Guadeloupe", code: "GP"},
  {name: "Guam", code: "GU"},
  {name: "Guatemala", code: "GT"},
  {name: "Guernsey", code: "GG"},
  {name: "Guinea", code: "GN"},
  {name: "Guinea-Bissau", code: "GW"},
  {name: "Guyana", code: "GY"},
  {name: "Haiti", code: "HT"},
  {name: "Heard and McDonald Islands", code: "HM"},
  {name: "Holy See (Vatican City State)", code: "VA"},
  {name: "Honduras", code: "HN"},
  {name: "Hong Kong,  SAR China", code: "HK"},
  {name: "Hungary", code: "HU"},
  {name: "Iceland", code: "IS"},
  {name: "India", code: "IN"},
  {name: "Indonesia", code: "ID"},
  {name: "Iran, Islamic Republic of", code: "IR"},
  {name: "Iraq", code: "IQ"},
  {name: "Ireland", code: "IE"},
  {name: "Isle of Man", code: "IM"},
  {name: "Israel", code: "IL"},
  {name: "Italy", code: "IT"},
  {name: "Jamaica", code: "JM"},
  {name: "Japan", code: "JP"},
  {name: "Jersey", code: "JE"},
  {name: "Jordan", code: "JO"},
  {name: "Kenya", code: "KE"},
  {name: "Kiribati", code: "KI"},
  {name: "Korea (North)", code: "KP"},
  {name: "Korea (South)", code: "KR"},
  {name: "Kuwait", code: "KW"},
  {name: "Kyrgyzstan", code: "KG"},
  {name: "Lao PDR", code: "LA"},
  {name: "Latvia", code: "LV"},
  {name: "Lebanon", code: "LB"},
  {name: "Lesotho", code: "LS"},
  {name: "Liberia", code: "LR"},
  {name: "Libya", code: "LY"},
  {name: "Liechtenstein", code: "LI"},
  {name: "Lithuania", code: "LT"},
  {name: "Luxembourg", code: "LU"},
  {name: "Macao, SAR China", code: "MO"},
  {name: "Macedonia, Republic of", code: "MK"},
  {name: "Madagascar", code: "MG"},
  {name: "Malawi", code: "MW"},
  {name: "Malaysia", code: "MY"},
  {name: "Maldives", code: "MV"},
  {name: "Mali", code: "ML"},
  {name: "Malta", code: "MT"},
  {name: "Marshall Islands", code: "MH"},
  {name: "Martinique", code: "MQ"},
  {name: "Mauritania", code: "MR"},
  {name: "Mauritius", code: "MU"},
  {name: "Mayotte", code: "YT"},
  {name: "Mexico", code: "MX"},
  {name: "Micronesia, Federated States of", code: "FM"},
  {name: "Moldova", code: "MD"},
  {name: "Monaco", code: "MC"},
  {name: "Mongolia", code: "MN"},
  {name: "Montenegro", code: "ME"},
  {name: "Montserrat", code: "MS"},
  {name: "Morocco", code: "MA"},
  {name: "Mozambique", code: "MZ"},
  {name: "Myanmar", code: "MM"},
  {name: "Namibia", code: "NA"},
  {name: "Nauru", code: "NR"},
  {name: "Nepal", code: "NP"},
  {name: "Netherlands", code: "NL"},
  {name: "Netherlands Antilles", code: "AN"},
  {name: "New Caledonia", code: "NC"},
  {name: "New Zealand", code: "NZ"},
  {name: "Nicaragua", code: "NI"},
  {name: "Niger", code: "NE"},
  {name: "Nigeria", code: "NG"},
  {name: "Niue", code: "NU"},
  {name: "Norfolk Island", code: "NF"},
  {name: "Northern Mariana Islands", code: "MP"},
  {name: "Norway", code: "NO"},
  {name: "Oman", code: "OM"},
  {name: "Pakistan", code: "PK"},
  {name: "Palau", code: "PW"},
  {name: "Palestinian Territory", code: "PS"},
  {name: "Panama", code: "PA"},
  {name: "Papua New Guinea", code: "PG"},
  {name: "Paraguay", code: "PY"},
  {name: "Peru", code: "PE"},
  {name: "Philippines", code: "PH"},
  {name: "Pitcairn", code: "PN"},
  {name: "Poland", code: "PL"},
  {name: "Portugal", code: "PT"},
  {name: "Puerto Rico", code: "PR"},
  {name: "Qatar", code: "QA"},
  {name: "Republic of Kosovo", code: "XK"},
  {name: "Romania", code: "RO"},
  {name: "Russian Federation", code: "RU"},
  {name: "Rwanda", code: "RW"},
  {name: "Réunion", code: "RE"},
  {name: "Saint Barthélemy", code: "BL"},
  {name: "Saint Helena", code: "SH"},
  {name: "Saint Kitts and Nevis", code: "KN"},
  {name: "Saint Lucia", code: "LC"},
  {name: "Saint Pierre and Miquelon", code: "PM"},
  {name: "Saint Vincent and the Grenadines", code: "VC"},
  {name: "Saint-Barthélemy", code: "BL"},
  {name: "Saint-Martin (French part)", code: "MF"},
  {name: "Samoa", code: "WS"},
  {name: "San Marino", code: "SM"},
  {name: "Sao Tome and Principe", code: "ST"},
  {name: "Saudi Arabia", code: "SA"},
  {name: "Senegal", code: "SN"},
  {name: "Serbia", code: "RS"},
  {name: "Seychelles", code: "SC"},
  {name: "Sierra Leone", code: "SL"},
  {name: "Singapore", code: "SG"},
  {name: "Slovakia", code: "SK"},
  {name: "Slovenia", code: "SI"},
  {name: "Solomon Islands", code: "SB"},
  {name: "Somalia", code: "SO"},
  {name: "South Africa", code: "ZA"},
  {name: "South Georgia and the South Sandwich Islands", code: "GS"},
  {name: "South Sudan", code: "SS"},
  {name: "Spain", code: "ES"},
  {name: "Sri Lanka", code: "LK"},
  {name: "Sudan", code: "SD"},
  {name: "Suriname", code: "SR"},
  {name: "Svalbard and Jan Mayen Islands", code: "SJ"},
  {name: "Sweden", code: "SE"},
  {name: "Switzerland", code: "CH"},
  {name: "Syrian Arab Republic (Syria)", code: "SY"},
  {name: "Taiwan, Republic of China", code: "TW"},
  {name: "Tajikistan", code: "TJ"},
  {name: "Tanzania, United Republic of", code: "TZ"},
  {name: "Thailand", code: "TH"},
  {name: "Timor-Leste", code: "TL"},
  {name: "Togo", code: "TG"},
  {name: "Tokelau", code: "TK"},
  {name: "Tonga", code: "TO"},
  {name: "Trinidad and Tobago", code: "TT"},
  {name: "Tunisia", code: "TN"},
  {name: "Turkey", code: "TR"},
  {name: "Turkmenistan", code: "TM"},
  {name: "Turks and Caicos Islands", code: "TC"},
  {name: "Tuvalu", code: "TV"},
  {name: "Uganda", code: "UG"},
  {name: "Ukraine", code: "UA"},
  {name: "United Arab Emirates", code: "AE"},
  {name: "United Kingdom", code: "GB"},
  {name: "United States of America", code: "US"},
  {name: "Uruguay", code: "UY"},
  {name: "Uzbekistan", code: "UZ"},
  {name: "Vanuatu", code: "VU"},
  {name: "Venezuela (Bolivarian Republic)", code: "VE"},
  {name: "Viet Nam", code: "VN"},
  {name: "Virgin Islands, US", code: "VI"},
  {name: "Wallis and Futuna Islands", code: "WF"},
  {name: "Western Sahara", code: "EH"},
  {name: "Yemen", code: "YE"},
  {name: "Zambia", code: "ZM"},
  {name: "Zimbabwe", code: "ZW"}
];

const searchCountry = document.querySelector(".search-country");
const countryListElement = document.querySelector(".country-list");
const changeCountry = document.querySelector(".change-country");
const close = document.querySelector(".close");
const input = document.getElementById('search-input');
let numLists = 1;
function createCountryList()
{
  const num = country_list.length;

  let i = 1, ul_Id;

  country_list.forEach( (country, index) => {
      if( index % Math.ceil(num/numLists) == 0){
          ul_Id = `list-${i}`;
          countryListElement.innerHTML += `<ul id='${ul_Id}'></ul>`;
          i++;
      }

      document.getElementById(`${ul_Id}`).innerHTML += `
          <li id="${country.name}">${country.name}</li>`;
  })
}
createCountryList();
 
changeCountry.addEventListener("click", function(){
  input.value = "";
  resetCountryList();
  searchCountry.classList.toggle("hide");
  searchCountry.classList.add("fadeIn");
});

close.addEventListener("click", function(){
  searchCountry.classList.toggle("hide");
});

countryListElement.addEventListener("click", function(){
  searchCountry.classList.toggle("hide");
});

input.addEventListener("input", function(){
  let value = input.value.toUpperCase();

  country_list.forEach( country => {
      if( country.name.toUpperCase().startsWith(value)){
          document.getElementById(country.name).classList.remove("hide");
      }else{
          document.getElementById(country.name).classList.add("hide");
      }
  })
})

function resetCountryList(){
  country_list.forEach( country => {
      document.getElementById(country.name).classList.remove("hide");
  })
}

const items = document.querySelectorAll('#list-1 > li');
items.forEach(item => {
	item.addEventListener('click',(e)=>{
    var searchedForCountry = e.target.textContent;
    console.log(searchedForCountry);
    fetch(covidUrl)
    .then(casesChange => {
        return casesChange.json();
    })
    .then(displayChangedData);

    function displayChangedData(casesChange)
  {
    var f;
    var countryChangeName = casesChange.Countries;
      countryChangeName.forEach(function(element){
          if(element.Country === searchedForCountry)
          {
            var name = document.querySelector('.country .name');
            name.innerText=element.Country;
            var confirmedValue= document.querySelector('.total-cases .value');
            confirmedValue.innerText=element.TotalConfirmed;
            var newValue = document.querySelector('.total-cases .new-value');
            newValue.innerText="+"+element.NewConfirmed;
            var recoveredValue = document.querySelector('.recovered .value');
            recoveredValue.innerText=element.TotalRecovered;
            var recoveredNewValue = document.querySelector('.recovered .new-value');
            recoveredNewValue.innerText="+"+element.NewRecovered;
            var deathValue = document.querySelector('.death .value');
            deathValue.innerText=element.TotalDeaths;
            var deathNewValue = document.querySelector('.death .new-value');
            deathNewValue.innerText="+"+element.NewDeaths;
            f=1;
          }
        });
      if(f==1);
      else
          {
            alert("Data for this country is not available in the API");
          }
  } 
}
)});
