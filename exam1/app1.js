var app = angular.module('myapp', ['ngRoute']);




app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        template:'<h1>Welcome </h1>',
        resolve: ['authservice', function(authservice){

            return authservice.checkuserstatus();
        }]
    })
    .when('/login', {
        templateUrl: './login.html',
        controller: 'LoginController'
        
        
        
    })
    .when('/users', {
        templateUrl: './users.html',
        controller: 'UsersController',
        resolve: ['authservice', function(authservice){

            return authservice.checkuserstatus();
        }]
        

    }).when('/userslist', {
        templateUrl:'./userlist.html',
        controller: 'UserslistController'
        
        
        
        //controller: 'SignupController'
    }).when('/home', {
        template: '<h1>Welcome to home page</h1>'
        //controller: 'SignupController'
    }).when('/logout',{

        template: '',
        controller: 'LogoutController'
        



    }).otherwise({redirectTo:'/login'})
});
app.run(function($rootScope){

 $rootScope.isLoggedin = "false";

 });



// $function($scope, attrs) {
//     var routeId = attrs.route;
//     $scope.loading = false;
//     $scope.copied = false;
//     $scope.showFull = false;

//     $scope.showText = function() {
//       $scope.showFull = true;
//     }

//     $scope.hideText = function() {
//       $scope.showFull = false;
//     }

    
    
    

app.controller('LoginController', function($scope,$location,$rootScope){
    //authservice.checkuserstatus();
    
   
$scope.login = function(){

    //  $rootScope.lc  == "false";
     if($scope.uname == "admin" && $scope.pwd == "admin"){

        
        
        alert("Successfully logged in");
        $location.path('/'); 
       
        $rootScope.isLoggedin = "true";
        //console.log($scope.isLoggedin);
        
    }
    else{
        $rootScope.isLoggedin = "false";

        alert("not Successfully logged in");
       // console.log($scope.isLoggedin);
        
        

    }

   
    
  
}
});
app.controller('UsersController', function($scope, $location){


   
    $scope.submit = function () {

    
       $scope.allusers = JSON.parse(localStorage.getItem('allusers')) || [];
        
        
        
        $scope.users = {
            username : $scope.uname,
            password : $scope.pwd,     
            email : $scope.email,
            usertype : $scope.option1,
            gender  : $scope.gender1
            };
        

     $scope.allusers.push($scope.users);
     
     localStorage.allusers = JSON.stringify($scope.allusers);
     $location.path('/userslist'); 
    
    
     
         
    };
    

    
});
    


app.controller('UserslistController', function($scope){

    if(localStorage.allusers){

       

        $scope.allusers = JSON.parse(localStorage.getItem('allusers')) || [];
    
        $scope.delete = function(name){

           // $scope.allusers1 = JSON.parse($window.localStorage.allusers);
        
        
        var index = $scope.allusers.indexOf(name);
        $scope.allusers.splice( index, 1 );	

        
       // $scope.students.splice(index, 1);
       localStorage.setItem('allusers', JSON.stringify( $scope.allusers));	
        //$window.localStorage.removeItem
    };
    }


});


app.factory('authservice', ['$rootScope', '$location',function($rootScope,$location){
    //console.log($rootScope.isLoggedin);
    return {
        
       

        'checkuserstatus' : function(){
            //console.log($rootScope.isLoggedin);

            if(!$rootScope.isLoggedin || $rootScope.isLoggedin    == "false"){
                $location.path('/login');
                return false;

               
                    

            }

           
            return true;
            
    }
};
            
}]);

app.controller('LogoutController', function($scope, $location, $rootScope){

    $rootScope.isLoggedin = "false";
    localStorage.clear();
    

    $location.path('/login');
    
});

