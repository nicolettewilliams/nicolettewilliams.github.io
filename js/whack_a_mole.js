$(document).ready(function() {

    var nuts = 0;
    var gameOverTimer = 31;
    var outdoor = new Audio("audio/outdoor.mp3");

    // plays background music on page load
    outdoor.play();

    // starts the game
    $('.start').click(function() {
        $('.middleDiv').show();
        $('.start').hide();
        play();
    });
// ===========================================================================
    // makes the game work
    function play(){

        var endGame = setInterval(function() {
            if (gameOverTimer == 0) {
                clearInterval(game);
                clearInterval(endGame);
                outdoor.pause();
                $('#dialog').modal('show');

                // if nuts equals 1 then it'll say nut instead of nuts
                if (nuts == 1) {
                    $('.modal-body').html('You grabbed ' + nuts + ' squirrel nut. <br> Do you want to play again?');
                } else {
                    $('.modal-body').html('You grabbed ' + nuts + ' squirrel nuts. <br> Do you want to play again?');
                };

                // reloads page when yes is clicked
                $('#yes').click(function(){
                    window.location.reload();
                });
            };

            // puts the counddown in the body
            $('#countDown').html(' ' + gameOverTimer + ' seconds...');
            gameOverTimer--;
        }, 1000);

        var game = setInterval(function() {

            // picks a random squirrel number
            randomHole = Math.floor((Math.random() * 8) + 1);
            // random audio number for when squirrel is clicked
            randomClicked = Math.floor((Math.random() * 4) + 1);
            // random audio number for when squirrel is missed
            randomMissed = Math.floor((Math.random() * 3) + 1);
            randomSelected = $('.molehole' + randomHole);

            // random selected squirrels data
            var id = randomSelected.data('moleid');

            randomSelected.addClass('active');

            animateSquirrel(id, randomSelected);

            missed = setTimeout(function() {
                
                if(randomSelected.hasClass('active')){
                    new Audio("audio/missed" + randomMissed + ".wav").play();
                };

                randomSelected.removeClass('active');
            }, 1990);

        }, 2000);
    };
    // ===========================================================================  
    $('.img').on('click', function() {
        // removes the active class when squirrel is clicked
        $(this).removeClass('active');
        new Audio("audio/clicked" + randomClicked + ".wav").play();
        // increments score
        nuts++;
        // changes nut images depending on how many squirrels clicked
        if (nuts >= 8){
            $('#gathered').html('Nuts Grabbed: ' + nuts + '<br><br>' + '<img src="img/bignuts.png">');
        } else if (nuts >= 4) {
            $('#gathered').html('Nuts Grabbed: ' + nuts + '<br><br>' + '<img src="img/smallnuts.png">');
        } else {
            $('#gathered').html('Nuts Grabbed: ' + nuts + '<br><br>' + '<img src="img/nut.png">');
        };
    });
    // ===========================================================================
    // all animations for squirrels
    function animateSquirrel(id, squirrel) {
        
        switch (id) {
            case 1:
                squirrel.animate({
                    top: '+=458px',
                    left: '+=359px'
                }, 1000).animate({
                    top: '-=458px',
                    left: '-=359px'
                }, 990);
                break;
            case 2:
                squirrel.animate({
                    top: '+=458px'
                }, 1000).animate({
                    top: '-=458px',
                }, 990);
                break;
            case 3:
                squirrel.animate({
                    top: '+=458px',
                    right: '+=329px'
                }, 1000).animate({
                    top: '-=458px',
                    right: '-=359px'
                }, 990);
                break;
            case 4:
                squirrel.animate({
                    left: '+=458px'
                }, 1000).animate({
                    left: '-=458px',
                }, 990);
                break;
            case 5:
                squirrel.animate({
                    right: '+=428px'
                }, 1000).animate({
                    right: '-=458px',
                }, 990);
                break;
            case 6:
                squirrel.animate({
                    bottom: '+=550px',
                    left: '+=359px'
                }, 1000).animate({
                    bottom: '-=550px',
                    left: '-=359px'
                }, 990);
                break;
            case 7:
                squirrel.animate({
                    bottom: '+=550px'
                }, 1000).animate({
                    bottom: '-=550px',
                }, 990)
                break;
            case 8:
                squirrel.animate({
                    bottom: '+=550px',
                    right: '+=329px'
                }, 1000).animate({
                    bottom: '-=550px',
                    right: '-=359px'
                }, 990);
                break;
        };
    };

});