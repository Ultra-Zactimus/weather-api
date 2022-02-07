//-HTML Example-//

<html lang="en-US">
<head>
  <script
  src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"></script>
  <script type="text/javascript" src="try.js"></script>
  <title>Enter a positive number</title>
</head>
<body>
  <div class="container">
    <h1>Please enter a whole number above 0</h1>
    <label for="number">Enter your number:</label>
    <input id="number" type="text">
    <button class="btn-success" id="submittedNumber">Is your number valid?</button>
    <div id="displayNumber"></div>
  </div>
</body>
</html>

//-Business Logic Example-//

function checkNumber(number) {
  if (isNaN(number) || number < 0) {
    return new Error("Not a valid number!");
  } else {
    return true;
  }
}

//-User Interface Logic Example-//

$(document).ready(function() {
  $('#submittedNumber').click(function() {
    const inputtedNumber = parseInt($('#number').val());
    $('#number').val("");

    try {
      const isNumberValid = checkNumber(inputtedNumber);
      if (isNumberValid instanceof Error) {
        console.error(isNumberValid.message);
        throw RangeError("Not a valid number!");
      } else {
        console.log("Try was successful, so no need to catch!");
        $('#displayNumber').text("This number is valid. You may continue.");
      }
    } catch(error) {
      console.error(`Red alert! We have an error: ${error.message}`);
    }
  });
});