var typing=document.getElementById("typestrings");

var typewriter= new Typewriter( typing, {
    loop:true
});

typewriter.typeString("</Web Developer>")
    .pauseFor(2500)
    .deleteAll()
    .typeString("</Web Designer>")
    .pauseFor(2500)
    .deleteChars(9)
    .start();

var btn= $("#button");
$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

// btn.on('click', function(e) {
//     e.preventDefault();
//     $('html , body').animate({scrollTop:0}, '300');
// });

function scrollToTop (duration) {
    // cancel if already on top
    if (document.scrollingElement.scrollTop === 0) return;

    const cosParameter = document.scrollingElement.scrollTop / 2;
    let scrollCount = 0, oldTimestamp = null;

    function step (newTimestamp) {
        if (oldTimestamp !== null) {
            // if duration is 0 scrollCount will be Infinity
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
            if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
            document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    // console.log(scroll);

    if (scroll >= 100) {
        $(".navbar").addClass("navbar-scroll");
    } else {
        $(".navbar").removeClass("navbar-scroll");
    }

    if (scroll >= 1230 || scroll <=1630){
        $("#pageOne").addClass("currentPage");
    }
    if (scroll >= 1630){
        $("#pageOne").removeClass("currentPage");
    }

    if (scroll >= 1630){
        $("#pageTwo").addClass("currentPage");
    }
    if (scroll >= 2030){
        $("#pageTwo").removeClass("currentPage");
    }
    if (scroll >= 2000){
        $("#pageThree").addClass("currentPage");
    }
    if (scroll >= 2430){
        $("#pageThree").removeClass("currentPage");
    }

});


function DownloadCV() {
    console.log("test");
    var storageRef=firebase.storage().ref();

    // var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/portfolio-c85d3.appspot.com/o/Cv%2FCV.pdf?alt=media&token=59005cc2-1c9c-4f82-a1eb-7e39d00b94ac');
    // console.log(httpsReference);
    storageRef.child('Cv/CV.pdf').getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        console.log(url);
        // // Or inserted into an <img> element:
        // var img = document.getElementById('myimg');
        // img.src = url;
    }).catch(function(error) {
        // Handle any errors
    });


}

function writeData() {

    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let subject=document.getElementById("subject").value;
    let message=document.getElementById("message").value;


    firebase
        .firestore()
        .collection('ContactData')
        .add({
            name,
            email,
            subject,
            message
        })
        .then(()=>{
            console.log("The message is sent successfully");
        });

}




