(function () {
    'use strict';

    angular.module("NarrowItDownApp", [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', function() {
        return {
            templateUrl: 'foundItems.html', 
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'dirCtrl',
            bindToController: true
        };
    });
    
    function FoundItemsDirectiveController() {
        var dirCtrl = this;
        
    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = this;
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
            }).then(function (response) {
                console.log("Datos recibidos:", response.data); 
                var foundItems = [];

               
                for (var category in response.data) {
                    if (response.data.hasOwnProperty(category)) {
                       
                        var menuItems = response.data[category].menu_items;

                        if (menuItems) {
                            
                            foundItems = foundItems.concat(menuItems.filter(function (item) {
                                return item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase());
                            }));
                        }
                    }
                }

                return foundItems; 
            }).catch(function (error) {
                console.error("Error en la solicitud:", error);
                alert("Hubo un error al cargar los datos. Verifica la consola para más detalles.");
                return []; 
            });
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = "";
        ctrl.found = [];
        ctrl.noResults = false; 

        ctrl.narrowItDown = function() {
            console.log("Buscando:", ctrl.searchTerm);
            if (ctrl.searchTerm.trim().length === 0) {
                ctrl.noResults = true;
                ctrl.found = [];
            }else {
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                .then(function (result) {
                    ctrl.found = result; 
                    console.log(ctrl.found); 
                    ctrl.noResults = (ctrl.found.length === 0);
                });
            }
        };

        ctrl.removeItem = function(index) {
            ctrl.found.splice(index, 1);
            if (ctrl.found.length === 0) {
                ctrl.noResults = true;  
            }
        };
        
    }

   
    
    
})();
