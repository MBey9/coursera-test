(function () {
    'use strict';


  angular.module("myApp", [])
.controller('Mycontroller',Mycontroller )

.controller('Mycontroller2',Mycontroller2 )
.service('servicio', servicio)

Mycontroller.$inject = ['servicio'];

function Mycontroller(servicio){

var lista1 = this;
lista1.items = [
    {name: "Apples", quantity: "5"},
    {name: "Pears", quantity: "5"},
    {name: "Oranges", quantity: "5"},
    {name: "Cookies", quantity: "10"},
    {name: "Cereals", quantity: "10"}
]

lista1.add = function(item) {
    servicio.add(item);
    servicio.remove(item, lista1);
}


}



Mycontroller2.$inject = ['servicio'];

function Mycontroller2(servicio){
var lista2 = this;

lista2.items =  servicio.comprado();

}


function servicio(){
    var servicio = this;
    var comprado = [];

    servicio.add = function (item){
        comprado.push(item);
        console.log("fruta comprada:", item)
    };
    servicio.remove = function (item, lista1){
        var index = lista1.items.indexOf(item);
        if (index !== -1) {
            lista1.items.splice(index, 1);  
        }
    };

    servicio.comprado = function(){
        return comprado;
    };

   


}



})()
