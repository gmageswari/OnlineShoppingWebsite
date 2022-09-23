app.controller("loginController",function($scope,$http){
    $scope.users = localStorage.getItem('users');
    if($scope.users === null){
        $scope.users = [];
    }
    else{
        $scope.users = angular.fromJson($scope.users);
    }
    $scope.showLogin = true;
    $scope.hideLoginSignup = false;
    $scope.signUpClicked = function(){
        $scope.showLogin = false;
    };
    $scope.createdUsername = "";
    $scope.createdPassword = "";
    $scope.submitClicked = function(){
        if($scope.createdUsername === "" && $scope.createdPassword === ""){
            $scope.showNoInputEnteredUN = true;
            $scope.showNoInputEnteredPW = true;
            $scope.errorMsg = "*required";
        }
        else{
            $scope.showNoInputEnteredPW = false;
            $scope.showNoInputEnteredUN = false;
            if($scope.createdUsername.length < 8){
                $scope.showNoInputEnteredUN = true;
                $scope.errorMsg = "*Username should be atleast 8 characters";
                return;
            }
            if($scope.createdPassword.length < 8){
                $scope.showNoInputEnteredPW = true;
                $scope.errorMsg = "*Password should be atleast 8 characters";
                return;
            }
            let digitPresent = false;
            let uppercasePresent = false;
            let lowercasePresent = false;
            for(let i=0;i<$scope.createdPassword.length;i++){
                if($scope.createdPassword[i] == 1 || $scope.createdPassword[i] == 2 || $scope.createdPassword[i] == 3||$scope.createdPassword[i] == 4||$scope.createdPassword[i] == 5||$scope.createdPassword[i] == 6||$scope.createdPassword[i] == 7||$scope.createdPassword[i] == 8||$scope.createdPassword[i] == 9 || $scope.createdPassword[i] == 0){
                    digitPresent = true;
                }
                else if(typeof $scope.createdPassword[i] === "string" && $scope.createdPassword[i] === $scope.createdPassword[i].toUpperCase()){
                    uppercasePresent = true;
                }
                else if(typeof $scope.createdPassword[i] === "string" && $scope.createdPassword[i] === $scope.createdPassword[i].toLowerCase()){
                    lowercasePresent = true;
                };
                
            }
            if(digitPresent && uppercasePresent && lowercasePresent){
                $scope.userDetails = {
                    username : $scope.createdUsername,
                    password : $scope.createdPassword
                };
                $scope.users.push($scope.userDetails);
                localStorage.setItem("users",angular.toJson($scope.users));
                $scope.showLogin = true;
            }
            else{
                $scope.showNoInputEnteredPW = true;
                $scope.errorMsg = "*Password should contain atleast one number and one uppercase and one lowercase letter";
            }
        };
    };
    $scope.loginClicked = function(){
        let loggedUser = $scope.users.filter((eachUser)=>{
            if(eachUser.username === $scope.loginUsername && eachUser.password === $scope.loginPassword){
                return true;
            }
        });
        if(loggedUser.length === 1){
            $scope.showNoInputEnteredPW = false;
            $scope.showHomePage = true;
            $scope.hideLoginSignup = true;
        }
        else{
            $scope.showNoInputEnteredPW = true;
            $scope.errorMsg = "*Invalid credentials(New User? Signup)";
        }
        $http.get("products.json").then(function(response){
            $scope.products = response.data.products;
        });
        
    };
});
