app.controller("loginController",function($scope,$http){
    $scope.users = localStorage.getItem('users');
    $scope.cartItems = localStorage.getItem('cart');
    
    if($scope.cartItems === null){
        $scope.cartItems = [];
    }
    else{
        $scope.cartItems = JSON.parse($scope.cartItems);
    }
    $scope.cartItemN = $scope.cartItems.length;
    $scope.showProductsContainer = false;
    $scope.showLogin = true;
    $scope.hideLoginSignup = false;
    $scope.createdUsername = "";
    $scope.createdPassword = "";
    $scope.startApp = function(){
        $scope.logged = localStorage.getItem("logged");
        
        if($scope.logged === "true"){
            $scope.showHomePage = true;
            $scope.hideLoginSignup = true;
            $scope.showProductsContainer = true;
            $http.get("products.json").then(function(response){
                $scope.products = response.data.products;
            });
            $scope.addToCartClicked = function(key){
                $scope.quantity = 0;
                $scope.showProductsContainer = false;
                $scope.showBigPictureCart = true;
                let bigPictureForCart = $scope.products.filter((eachProduct)=>{
                    if(eachProduct.$$hashKey === key){
                        return true;
                    }
                });
                $scope.otherProducts = $scope.products.filter((eachProduct)=>{
                    if(eachProduct.$$hashKey !== key){
                        return true;
                    }
                });
                $scope.clickedPicture = bigPictureForCart[0];
                window.scroll({
                    top : 0,
                    left : 0,
                    behavior : "smooth"
                });
    
            }
            $scope.quantity = 0;
            $scope.plusClicked = function(){
                $scope.quantity = $scope.quantity + 1;
            }
            $scope.minusClicked = function(){
                $scope.quantity = $scope.quantity - 1;
            }
            
            $scope.addToCart = function(key){
                $scope.showProductsContainer = true;
                $scope.showBigPictureCart = false;
                let cartItem = $scope.products.filter((eachProduct)=>{
                    if(eachProduct.$$hashKey === key){
                        return true;
                    }
                });
                cartItem[0].quantity = $scope.quantity;
                cartItem[0].incart = true;
                $scope.cartItems = [...$scope.cartItems,cartItem[0]];
                console.log($scope.cartItems);
                localStorage.setItem('cart',JSON.stringify($scope.cartItems));
                $scope.cartItemN = $scope.cartItems.length;
               
            }
            
            $scope.showCart = function(){
                $scope.showCartContainer = true;
                $scope.showBigPictureCart = false;
                $scope.showProductsContainer = false;
                if($scope.cartItems.length === 0){
                    $scope.nothingInCart = true;
                    $scope.cartPara = "Cart is Empty :(";
                }
                else{
                    $scope.nothingInCart = false;
                }
            }
            $scope.showHome = function(){
                $scope.showCartContainer = false;
                $scope.showBigPictureCart = false;
                $scope.showProductsContainer = true;
            }
            $scope.removeFromCartClicked = function(key){
                console.log("removed from cart");
                $scope.cartItems = $scope.cartItems.filter((eachProduct)=>{
                    if(eachProduct.$$hashKey !== key){
                        return true;
                    }
                });
                $scope.products.map((eachProduct)=>{
                    if(eachProduct.$$hashKey === key){
                        eachProduct.quantity = 0;
                        eachProduct.incart = false;
                    }
                })
    
                $scope.showHome();
            }
            $scope.removeFromCartIncart = function(key){
                $scope.cartItems = $scope.cartItems.filter((eachProduct)=>{
                    if(eachProduct.$$hashKey !== key){
                        return true;
                    }
                });
                console.log($scope.cartItems);
                localStorage.setItem('cart',angular.toJson($scope.cartItems));
                $scope.products.map((eachProduct)=>{
                    if(eachProduct.$$hashKey === key){
                        eachProduct.quantity = 0;
                        eachProduct.incart = false;
                    }
                })
                $scope.showCart();
                $scope.cartItemN = $scope.cartItems.length;
            };
            $scope.totalAmount = 0;
            $scope.findTotal = function(){
                
                $scope.totalAmount = 0;
                
                if($scope.cartItems !== []){
                    $scope.cartItems.map((eachProduct)=>{
                        $scope.totalAmount = $scope.totalAmount + (eachProduct.price * eachProduct.quantity);
                    });
                    return $scope.totalAmount;
                }
                return 0;
                
                
            };
            $scope.checkoutClicked = function(){
                let productArray = $scope.products.map((eachProduct)=>{
                    eachProduct.incart = false;
                    eachProduct.quantity = 0;
                    return eachProduct;
                });
                $scope.cartPara = "Thankyou for shopping....";
                console.log($scope.products);
                $scope.products = productArray;
                console.log($scope.products);
                $scope.cartItems = [];
                $scope.nothingInCart = true;
                localStorage.removeItem("cart");
                $scope.cartItemN = $scope.cartItems.length;
            }
            $scope.logoutClicked = function(){
                localStorage.removeItem("logged");
                $scope.startApp();
    
            }
        }
        else{
            $scope.showHomePage = false;
            $scope.hideLoginSignup = false;
            $scope.showProductsContainer = false;
            if($scope.users === null){
                $scope.users = [];
            }
            else{
                $scope.users = angular.fromJson($scope.users);
            }
            
            $scope.signUpClicked = function(){
                $scope.showLogin = false;
            };
            
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
            $scope.showProductsContainer = true;
            $scope.loginClicked = function(){
                let loggedUser = $scope.users.filter((eachUser)=>{
                    if(eachUser.username === $scope.loginUsername && eachUser.password === $scope.loginPassword){
                        return true;
                    }
                });
                if(loggedUser.length === 1){
                    localStorage.setItem("logged",true);
                    $scope.showNoInputEnteredPW = false;
                    $scope.showHomePage = true;
                    $scope.hideLoginSignup = true;
                    $scope.showProductsContainer = true;
                    $scope.startApp();
                }
                else{
                    $scope.showNoInputEnteredPW = true;
                    $scope.errorMsg = "*Invalid credentials(New User? Signup)";
                }
                
            };
        }
    }
    $scope.startApp();
    
    
    
});
