// button click and url submit
$("form button").on("click",() => {
    if($("#link").val() == ""){
        alert("Please paste your link");
    }else{
        var data = $("form").serializeArray();
        $("#text").css("display","none");
        $("#loader").css("display","block");
        finder(data[0].value);
    }
});

// title short for add 3 dots
function titleShorter(str){
    var i = 0;
    var title = "";
    while(i<=50){
        title += str[i];
        i++;
    }
    return title;
}

// Video streams writer
function writer(response){
    $("#text").css("display","block");
    $("#loader").css("display","none");
    let mainurl = $(location).attr("href");
    if(!mainurl.includes("#success")){
        $(location).attr("href",$(location).attr("href")+"#success");
    }else{
        $(location).attr("href",mainurl);
    }
    if(response.statusCode === 404){
        $("#error").css("display","block");
        $("#error").html("<h5 class='text-center'>There are some technical probelum Please try after some time...</h5>");
    }else if(response == {}){
        $("#error").css("display","block");
        $("#error").html("<h5 class='text-center'>Invalid URL</h5>");
    }else{
        $("#success").css("display","block");
        console.log(response);
        $(".video-section img").attr("src",response.thumbnail);
        $("#title").html("<h4>"+response.title+"</h4>");
        var str = $("#title").text();
        if(str.length > 50){
            var title = titleShorter(str);
            $("#title").html("<h4>"+title+"...</h4>");
        }
        $("#links").html("");
        response.videos.forEach(element => {
            $("#links").append('<div class="row"><div class="col text-center"><h5>'+element.quality+'</h5></div><div class="col text-center"><a href="'+element.url+'"><button class="btn btn-success m-auto">Download</button></a></div></div>');
        });
    }
}

// Youtube videos fetch script
function finder(url){
    fetch("https://utyubedownloader.herokuapp.com/fetch?url="+url)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(response => {
        console.log(response);
        writer(response);
    })
    .catch(err => {
        console.error(err);
    });
}