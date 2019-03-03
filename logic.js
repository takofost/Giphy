$(document).ready(function () {

    var gifs = ["reaction", "meme"];

    function loadBTNs() {
        $("#btn-view").empty();
        for (var i = 0; i < gifs.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("gif");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", gifs[i]);
            gifButton.text(gifs[i]);
            $("#btn-view").append(gifButton);
        }
    }
    function newBTN() {
        $("#addGif").on("click", function () {
            var gif = $("#gif-input").val().trim();
            if (gif == "") {
                return false;
            }
            gifs.push(gif);

            loadBTNs();
            return false;
        });
    }
    function loadGifs() {
        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=u77MVjn3jh03xqA0iRsZtsR63ocaZlDl&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                console.log(response);
                $("#gif-view").empty();
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);

                    $("#gif-view").prepend(gifDiv);
                }
            });
    }
    loadBTNs();
    newBTN();
    $(document).on("click", ".gif", loadGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});
