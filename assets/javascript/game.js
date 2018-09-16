$(function(){

var topics = [
  "Fashion",
  "Oscar de la Renta",
  "Oscar The Grouch",
  "Oscar Mayer",
  "John Mayer",
  "Moon",
  "Moonlight",
  "Starry Night",
  "Vincent Van Gogh",
  "M.C. Escher",
  "Buckminster Fuller",
  "Buckminster Palace",
  "Brokedown Palace",
  "Grateful Dead",
  "Mickey Hart",
  "Drums & Space",
  "Neil deGrasse Tyson",
  "Neil Diamond",
  "Diamonds in the Sky",
  "Lucy in the Sky",
  "Loose Lucy",
  "Science",
  "Architecture",
  "Infinite",
  "Leonardo da Vinci",
  "Rodin" 
];

createButtons();

function createButtons () {
  for (var i=0; i<topics.length; i++) {
    var btnTxt = topics[i];
    console.log(topics[i]);
     var btndiv=$('<button>').attr({
      id: "btnDiv_"+i,
      type: "button",
      class: "btn btn-secondary",
      'data-topic': btnTxt,
    });

    $("#btnContainer").append(btndiv);
    $("#btnDiv_"+i).text(btnTxt);
  } 
}; //end create buttons

$("button").on("click", function() {
   // Grabbing and storing the data-topic property value from the button
   var topic = $(this).attr("data-topic");

   // Constructing a queryURL
  // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  //   animal + "&api_key=dc6zaTOxFJmzC&limit=10";
   var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=fqno4evS4qDSIgn9pivdZEJIGuxyhgek&q="+topic+"&limit=10&offset=0&lang=en";

   // Performing an AJAX request with the queryURL
   $.ajax({
     url: queryURL,
     method: "GET"
   })
     // After data comes back from the request
     .then(function(response) {
       console.log(queryURL);

       console.log(response);
       // storing the data from the AJAX request in the results variable
       var results = response.data;

       // Looping through each result item
       for (var i = 0; i < results.length; i++) {

         // Creating and storing a div tag
         var topicsDiv = $("<div>");

         // Creating a paragraph tag with the result item's rating
         var r = $("<p>").text("Rating: " + results[i].rating);

         // Creating a paragraph tag with the result item's title
         var t = $("<p>").text("Title: " + results[i].title);

         // Creating and storing an image tag
         var topicImage=$('<img>').attr({
          src: results[i].images.fixed_width_still.url,
          'data-still': results[i].images.fixed_width_still.url,
          'data-animate': results[i].images.fixed_width.url,
          'data-state': "still",
          class: "gif",
        });
         // Appending the paragraph and image tag to the animalDiv
         topicsDiv.append(topicImage);
         topicsDiv.append(t);
         topicsDiv.append(r);

         // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
         $("#gifs-appear-here").prepend(topicsDiv);
       }
     });

     $("#gifs-appear-here").on("click", ".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });



});



}); //end on load jquery method