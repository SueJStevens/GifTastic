$(function () {

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

  function createButtons() {
    //<li><a href="#home">Item 1</a></li>
    for (var i = 0; i < topics.length; i++) {
      var navItemOuterWrapper = $("<li>").attr({
        id: "oLink_" + i,
      })
      var navTxt = topics[i];
      var navItemInnerWrapper = $("<a>").attr({
        href: "#iLink_" + i,
        id: "iLink_" + i,
        'data-topic': navTxt,
      })

      $("#navContainer").append(navItemOuterWrapper)
      $("#oLink_" + i).append(navItemInnerWrapper);
      $("#iLink_" + i).text(navTxt);

    }
  }; //end create buttons


  $(document).on("click", "a", function () {
    //clear the board of previous gifs, if any
    var list = document.getElementById("gifs-appear-here");
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }

    // Grabbing and storing the data-topic property value from the button
    var topic = $(this).attr("data-topic");

    // Constructing the queryURL
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=fqno4evS4qDSIgn9pivdZEJIGuxyhgek&q=" + topic + "&limit=10&offset=0&lang=en";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function (response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          //Create Card's outer wrapper
          var topics_outer_wrapper = $("<div>").attr("class", "col col-xl-2 col-lg-3 col-md-5 col-sm-12 col-xs-12 border border-secondary m-3 p-0 wrapperCanClick");

          var topicImage = $('<img>').attr({
            class: "card-img-top gif",
            src: results[i].images.fixed_width_still.url,
            'data-still': results[i].images.fixed_width_still.url,
            'data-animate': results[i].images.fixed_width.url,
            'data-state': "still",
            alt: "Card image cap",
          });

          var topics_card_body = $("<div>").attr("class", "card-body p-1");

          console.log(results[i].title)
          var topics_card_ratings = $("<p>").attr("class", "card-text text-left small pb-0").text("Rating: " + results[i].rating);
          var topics_card_title = $("<h5>").attr("class", "card-title text-center").text(results[i].title);
          var topics_btn_div = $("<div>").attr("class", "text-center");
          var topics_card_btn = $("<button>").attr({
            id: "ibtn_" + i,
            type: "button",
            class: "btn btn-secondary btn-circle btn-lg btn-dark"
          });
          var glyph = $("<i>").attr("class", "fa fa-play-circle");

          $(topics_btn_div).append(topics_card_btn);
          $(topics_card_btn).append(glyph);



          $(topics_outer_wrapper).append(topicImage);
          $(topics_outer_wrapper).append(topics_card_body);
          $(topics_outer_wrapper).append(topics_card_ratings);
          $(topics_outer_wrapper).append(topics_card_title);
          $(topics_outer_wrapper).append(topics_btn_div);

          $("#gifs-appear-here").prepend(topics_outer_wrapper);

        }
      });

  });

  $("#gifs-appear-here").on("click", ".gif", function () {
    console.log("clicked");
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

  $("#navContainer").on("change", ".addTag", function(){
    console.log("changed");
    var newTag = $(this).val();
    console.log(newTag);
  });

  /*This is a good generic function to help identify what element is being clicked on
  
   function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
  }
  
  document.addEventListener('click', function (e) {
    alert(e.target.className);
    if (hasClass(e.target, 'test-element')) {
        alert('test');
    }
  }, false); 
  */


}); //end on load jquery method