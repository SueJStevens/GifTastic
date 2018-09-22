$(function () {

  var topics = [
    "John Mayer",
    "Moon",
    "Night Sky",
    "Starry Night",
    "Vincent Van Gogh",
    "M.C. Escher",
    "Buckminster Fuller",
    "Architecture",
    "Infinite",
    "Lemniscate",
    "Continuum",
  ];

  var giffy_search_results = {
    topic: "",
    id: [],
  }

  var favids = [];

  createButtons();

  function createButtons() {

    $('#navContainer').parent().find('.navItem').remove();

    for (var i = 0; i < topics.length; i++) {
      var navItemOuterWrapper = $("<li>").attr({
        id: "oLink_" + i,
        class: "navItem",
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

    //Look to see if the favorites array has any items in it.
    if(favids.length!=0) {
      $(".favorites_heading").removeClass("d-none");      
    }

    $(".instructions").addClass("d-none");      


    // Grabbing and storing the data-topic property value from the button
    var topic = $(this).attr("data-topic");

    // Constructing the queryURL
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=fqno4evS4qDSIgn9pivdZEJIGuxyhgek&q=" + topic + "&limit=10&offset=0&lang=en";

    /*
    This call to http://api.giphy.com/v1/gifs/xBoysJgwhLEZtAjbY1?api_key=fqno4evS4qDSIgn9pivdZEJIGuxyhgek&q just returns one GIF Object relating to the GIF with id ffeqkVgjJpYtjy.
    */

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
        results.reverse();

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          console.log(results[i].id);
          //populate results array
          giffy_search_results.topic = topic;
          giffy_search_results.id[i]=results[i].id; 

          //Create Card's outer wrapper
          var topics_outer_wrapper = $("<div>").attr("class", "card col col-xl-2 col-lg-3 col-md-5 col-sm-12 col-xs-12 border border-secondary m-3 p-0 wrapperCanClick");

          var topicImage = $('<img>').attr({
            class: "card-img-top gif",
            src: results[i].images.fixed_width_still.url,
            'data-still': results[i].images.fixed_width_still.url,
            'data-animate': results[i].images.fixed_width.url,
            'data-state': "still",
            alt: "Card image cap",
          });

          var topics_card_body = $("<div>").attr("class", "card-body p-1");

          var topics_card_ratings = $("<p>").attr("class", "card-text text-left small pb-0").text("Rating: " + results[i].rating);
          var topics_card_title = $("<h5>").attr("class", "card-title text-center text-capitalize").text(results[i].title);
          var topics_btn_div = $("<div>").attr("class", "card-footer text-right border-secondary bg-transparent");
          var topics_card_btn = $("<button>").attr({
            id: "ibtn_" + i,
            type: "button",
            class: "btn btn-secondary btn-circle btn-sm mt-auto btn-dark mt-auto fav"
          });
          var glyph = $("<i>").attr("class", "fa fa-heart");

          $(topics_btn_div).append(topics_card_btn);
          $(topics_card_btn).append(glyph);

          $(topics_card_body).append(topics_card_ratings);
          $(topics_card_body).append(topics_card_title);

          $(topics_outer_wrapper).append(topicImage);
          $(topics_outer_wrapper).append(topics_card_body);
          $(topics_outer_wrapper).append(topics_btn_div);

          $("#gifs-appear-here").prepend(topics_outer_wrapper);

          //show the topics heading with the topics value populated
          $(".topic_heading").text(topic);
          $(".topic_heading").removeClass("d-none");    
            


        }
      });

  });

  
  //function to toggle animation of gif
  $(document).on("click", ".gif", function () {
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

  //function for user created tags
  $("#navContainer").on("change", ".addTag", function(){
    console.log("changed");
    var newTag = $(this).val();
    console.log(newTag);
    topics.unshift(newTag);
    createButtons();
    //return value of input button to blank 
    $(".addTag").val("")
  });

  //Favorites Function
  $("#gifs-appear-here").on("click", ".fav", function () {

        //clear the board of previous gifs, if any
        var list = document.getElementById("favs-appear-here");
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
    
    //get the index of the favorite clicked
    var ind = $(this).attr("id").slice($(this).attr("id").indexOf("_")+1,$(this).attr("id").length);
    //store it in the array
    favids.push(giffy_search_results.id[ind]);

    // Grabbing ID value from the array so we can pull this specific gif
    for (var i=0; i<favids.length; i++) {
      var giffyID = favids[i];

    var queryURL = "https://api.giphy.com/v1/gifs/" + giffyID + "?api_key=fqno4evS4qDSIgn9pivdZEJIGuxyhgek"
    console.log(queryURL);

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

          //Create Card's outer wrapper
          var topics_outer_wrapper = $("<div>").attr("class", "col col-xl-1 col-lg-3 col-md-5 col-sm-12 col-xs-12 border border-secondary m-3 p-0 wrapper1CanClick");

          var topicImage = $('<img>').attr({
            class: "gif",
            src: results.images.fixed_height_small_still.url,
            'data-still': results.images.fixed_height_small_still.url,
            'data-animate': results.images.fixed_height_small.url,
            'data-state': "still",
            alt: "Card image cap",
          });

          $(topics_outer_wrapper).append(topicImage);
          $("#favs-appear-here").prepend(topics_outer_wrapper);

          if(favids.length!=0) {
            $(".favorites_heading").removeClass("d-none");      
          }
  
        
      });
    } //close loop

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