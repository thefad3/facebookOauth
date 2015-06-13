window.fbAsyncInit = function() {

    FB.init({
        appId      : '1492538204340357',
        xfbml      : true,
        version    : 'v2.3'
    });
    
    //Check Facebook.com login Status
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;

                    //If user is logged in, hide button
                    $('.facebookButton').hide();
                    //Then Log them into the site with token auth
                        FB.api('/me', function (response) {
                                console.log(response);
                                $('.FBPics').append('<div></div>', response.first_name + ' ' + response.last_name);
                                $('.ProfileP').attr('href', response.link);
                        });
                        
                      // Note: The call will only work if you accept the permission request
                $('#facebookStatus').submit(function(e){
                    e.preventDefault();
                    var status = $("#status").val();
                    postStatus(status);
                });
                
                function postStatus(status){

                        FB.api('/me/feed', 'post', { message: status }, function(response) {
                            if (!response || response.error) {
                                $(".statusConfirm").text( "If your reading this, its too late." ).show();
                            } else {
                                $(".statusConfirm").text( "You have Sucessfully Posted to your Facebook!" ).show();
                            }
                        });
                                        
             
                };
                $('#logoutFacebook').on('click', function(){
                    
                    FB.logout(function(response) {
                        if(!response || response.error){
                            alert('Something went wrong... Sounds like a Facebook Problem');
                            window.location.href = 'https://facebookoauth-thefad3.c9.io/';
                        }else{
                            alert('You are now logged out of Facebook!');
                            window.location.href = 'https://facebookoauth-thefad3.c9.io/';
                        }
                            
                    });
                    
                })
                function logoutFacebook(){

                }
                    
                

        } else if (response.status === 'not_authorized') {
                    facebookLogin = function() {
                        FB.login(function (response) {
                            if (response.authResponse) {
                                
                                console.log('Welcome!  Fetching your information.... ');
                                FB.api('/me', function (response) {
                                    console.log('Good to see you, ' + response.name + '.');
                                    console.log(response);
                                });
                            window.location.href = 'https://facebookoauth-thefad3.c9.io/';
                                
                            } else {
                                console.log('User cancelled login or did not fully authorize.');
                            }
                        });
                    };
        } else {                    
            $('.loggedIn').hide();
            console.log(response);
                facebookLogin = function() {
                    FB.login(function (response) {
                        if (response.authResponse) {
                            console.log('Welcome!  Fetching your information.... ');
                            FB.api('/me', function (response) {
                                console.log('Good to see you, ' + response.name + '.');
                                console.log(response);
                            });
                            window.location.href = 'https://facebookoauth-thefad3.c9.io/';
                            
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    });
                };
        }
    });

};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


