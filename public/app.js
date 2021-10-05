console.log("js file is runnin");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageone = document.querySelector("#one");
const messagetwo = document.querySelector("#two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  messageone.textContent = "Loading";
  messagetwo.textContent = "";
  fetch("/weather?location=" + location).then((res) => {
    if (res.error) {
      return (messageone.textContent = res.error);
    }
    res.json().then((data) => {
      console.log(data);
      return (messageone.textContent = "Temperature: " + data.Temperature);
    });
  });
});
