$(document).ready(() => {

    $(".result").hide();
    $('.error').hide();
    //search with the name and year
    $('#searchFormName').on('submit', (e) => {
        let searchText = $('#searchText').val();
        let searchYear = $('#searchYear').val();
        getMovieByName(searchText, searchYear);
        e.preventDefault();
    });
    //search with the imdbID
    $('#searchFormId').on('submit', (e) => {
        let searchId = $('#searchId').val();

        getMovieById(searchId);
        e.preventDefault();
    });
});

function getMovieByName(searchText, searchYear) {
    $.ajax('https://www.omdbapi.com/?apikey=7ba6172e&t=' + searchText + '&y=' + searchYear)
        .then((response) => {
            display(response);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getMovieById(searchId) {
    $.ajax('https://www.omdbapi.com/?apikey=7ba6172e&i=' + searchId)
        .then((response) => {
             display(response);
        })
        .catch((err) => {
            console.log(err);
        });
}
//Displaying Details....
function display(response) {
    console.log(response);
    if (response.Response == "False") {
        $('.error').show();
    } else {
        $('.result').show();

        $('#title').html(response.Title);
        if (response.Poster == "N/A") {
          //if poster is not available
            $(".coverPic").attr("src", "" + 'http://www.movies.ie/wp-content/uploads/2016/03/JungleBook1.jpg' + "");

        } else {
          //if poster is available display it
            $(".coverPic").attr("src", "" + response.Poster + "");
        }
        // movie details
        $('#Year').html(response.Year);
        $('#Actors').html(response.Actors);
        $('#Awards').html(response.Awards);
        $('#BoxOffice').html(response.BoxOffice);
        $('#Country').html(response.Country);
        $('#Director').html(response.Director);
        $('#Genre').html(response.Genre);
        $('#Language').html(response.Language);
        $('#Production').html(response.Production);
        $('#Released').html(response.Released);
        $('#Runtime').html(response.Runtime);
        $('#imdbID').html(response.imdbID);
//to display the ratings
        var tr;
        for (var i = 0; i < response.Ratings.length; i++) {
            tr = $('<tr/>');
            tr.append(i + ")" + response.Ratings[i].Source + ":");
            tr.append("" + response.Ratings[i].Value + " ");
            $('#Ratings').append(tr);
        }

        $('#link').html(response.Website);
       $('#Plot').html(response.Plot);

    }
}