angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('GendersCtrl',function($scope, $stateParams, $timeout, $location, GenderFactory, $ionicPopup, $state){

  $scope.id = $stateParams.id;


  $scope.list = function(){   

    GenderFactory.list()
      .then(function(res){

        $scope.ready= false;
        $scope.error= false;
        $scope.genders = res.data;
        $scope.ready= true;
      })
      .catch(function(err){
        $scope.error = true;
        $scope.ready = true;
        $scope.message = "Status "+err.Status+" - "+err.data;
        /*console.log(err.data+'-'+err.status);*/
      })
      .finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
      });

        /*$scope.genders = [
        {"name":"Heavy Metal"},
        {"name":"Power Metal"},
        {"name":"Death Metal"},
        {"name":"Trash Metal"}
        ];*/
  };

  $scope.destroy = function(id){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Eliminar genero musical',
      template: '¿Desea usted eliminar este registro?'
    });
    confirmPopup.then(function(res){
      if(res){
        GenderFactory.destroy(id)
        .then(function(res){

          var alertPopup = $ionicPopup.alert({
            title: 'Registro eliminado',
            template: res.data
          });

          alertPopup.then(function(res){

            console.log("qk");

            $state.go($state.current, {}, {reload: true});
          });

        })

        .catch(function(err){
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'No se pudo eliminar el registro. Error: '+err.status+' - '+err.data
          });
          alertPopup.then(function(res){
            console.error('Error',err.status, err.data);
          });
        });
      }
    });
  };

  $scope.create = function(gender){

    GenderFactory.create(gender)
      .then(function(res){

        $scope.noReady = false;
        $scope.success = true;
        $timeout(function(){
          $location.path('/tab/genders');
        }, 1500);
      })
      .catch(function(err){

        $scope.noReady = false;
        $scope.error = true;
        $scope.status = "Error: "+err.status;
        $scope.message = err.data;
      })
  };

  $scope.update = function(gender){
    $scope.noReady = true;
    $scope.error = false;

    GenderFactory.update(gender)
    .then(function(res){

      $scope.noReady = false;
      $scope.success = true;
      $timeout(function(){
        $location.path('/tab/genders');
      }, 1500);
    })
    .catch(function(err){
      $scope.noReady = false;
      $scope.error = true;
      $scope.status = "Error: "+err.status;
      $scope.message = err.data;
    });
  };

  $scope.show = function(id){
    $scope.noReady = true;
    $scope.error = false;

    GenderFactory.show(id)
    .then(function(res){
      $scope.noReady = false;
      $scope.gender = res.data;
    })
    .catch(function(err){
      console.error('Error',err.status,err.data);
    });
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
