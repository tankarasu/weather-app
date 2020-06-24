const weatherForm = document.getElementById("form");
const search = document.getElementById("search");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  messageTwo.textContent = "";
  messageOne.textContent = "Loading...";

  fetch(`/weather?adress=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
      console.log(data.location);
      console.log(data.forecast);
    });
  });
});
