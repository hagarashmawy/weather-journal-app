const apiKey = "API KEY HERE";
async function submit() {
  const zipCode = document.getElementById("zip").value;
  const temp = await getTemp(zipCode);
  const getDate = new Date();
  const currentDate = getDate.toLocaleString();
  const feeling = document.getElementById("feelings").value;
  await postJournal(temp, currentDate, feeling);
}
document.getElementById("submit").addEventListener("click", submit);

async function getTemp(zipcode) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=imperial`;
  const request = await fetch(apiURL);
  const response = await request.json();
  return Math.round(response.main.temp);
}

async function postJournal(temp, date, feeling) {
  const apiURL = `http://localhost:1995/api`;
  const request = await fetch(apiURL, {
    method: "POST",
    body: JSON.stringify({
      temp,
      date,
      feeling,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const response = await request.json();
  await getJournal();
}

async function getJournal() {
  const apiURL = `http://localhost:1995/api`;
  const request = await fetch(apiURL);
  const response = await request.json();
  const log = document.getElementById("entry-log");
  if (Object.keys(response).length === 0) {
    log.innerText =
      "You have no previous journal submissions, please start by adding one from the form above.";
  } else {
    log.innerHTML = "";
    const { temp, date, feeling } = response;
    const tempPar = document.createElement("p");
    tempPar.innerText = temp;
    const datePar = document.createElement("p");
    datePar.innerText = date;
    const feelingPar = document.createElement("p");
    feelingPar.innerText = feeling;
    log.appendChild(tempPar);
    log.appendChild(datePar);
    log.appendChild(feelingPar);
  }
  console.log(response);
}
getJournal();
