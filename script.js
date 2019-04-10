var apiUrl = "https://api.punkapi.com/v2/beers?food=";

document.getElementById("foodSubmit").addEventListener("click", getBeerPair);
document.getElementById("toTop").addEventListener("click", backToTop);
document.getElementById("foodName").addEventListener("keyup", enterPress);

function getBeerPair() {
  var usersBeer = document.getElementById("foodName").value.trim();
  var replaceSpace = usersBeer.split(" ").join("_");
  fetch(apiUrl + replaceSpace)
    .then(res => res.json())
    .then(data => {
      let output =
        "<h3 class='headerReturnData'>The Beer(s) for your choice of food</h3>";
      let count = 0;
      data.forEach(function(beers) {
        output += `
            <div class="flex-container">

                <ul class="outputList">
                    <li><b>Name:</b> ${beers.name}</li>
                    <li><b>Description:</b> ${beers.description}</li>
                    <li><b>Alcohol by Volume:</b> ${beers.abv}</li>
                    <li><b>Food Pairings:</b>  ${beers.food_pairing}</li>
                </ul> 
            </div>
          `;

        count++;
      });
      document.getElementById("beerApiResponse").innerHTML = output;
      document.getElementById("apiJsonLength").innerHTML =
        "You returned " + count + " beers.";
    });
}

function enterPress() {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("foodSubmit").click();
  }
}

function backToTop() {
  const x = document.documentElement.scrollTop || document.body.scrollTop;
  if (x > 0) {
    window.requestAnimationFrame(backToTop);
    window.scrollTo(0, x - x / 8);
  }

  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
}
