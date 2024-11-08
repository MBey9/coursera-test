(function () {
    'use strict';

    angular.module("myApp", [])
    .controller('myAppController', myAppController);
    myAppController.$inject = ['$scope'];
    

    function myAppController($scope){
        $scope.name = "";
        $scope.checkbox = "";
    

    $scope.btncheck = function () {
        
        var items = $scope.name.split(",").filter(function(item) {return item.trim() !== ""; 
        });
        console.log(items);

        if(items.length == 0){
            $scope.result= "Empty";
            $scope.checkbox = "fontred";
            

        }else if(items.length >= 1 && items.length <=3){
            $scope.result= "Enjoy!";
            $scope.checkbox = "fontgreen";
            
        }else if(items.length > 3){
            $scope.result= "Too much!";
            $scope.checkbox = "fontgreen";
        }
    };

};

})()