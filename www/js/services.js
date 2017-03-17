angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('GenderFactory', function($http, $rootScope){

  return{
    list: function(){
      return $http({
        method: 'GET',
        url: $rootScope.urlBackend+'/v1/genders',
        headers: $rootScope.requestHeaders
      });
    },
    /*show: function(id){},
    create: function(gender){},
    update: function(gender){},*/
    destroy: function(id){
      return $http({
        method:'delete',
        url: $rootScope.urlBackend+'/v1/genders/'+id,
        headers: $rootScope.requestHeaders
      });
    },

    create: function(gender){
      return $http({
        method: 'POST',
        url: $rootScope.urlBackend+'/v1/genders',
        data: gender,
        headers: $rootScope.requestHeaders
      });
    },

    show: function(id){
      return $http({
        method: 'GET',
        url: $rootScope.urlBackend+'/v1/genders/'+id,
        headers: $rootScope.requestHeaders
      });
    },
    update: function(gender){
      return $http({
        method: 'PUT',
        url: $rootScope.urlBackend+'/v1/genders/'+gender.id,
        data: gender,
        headers: $rootScope.requestHeaders
      });
    }

  };
})
;