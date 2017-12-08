var app = window.angular.module('app', [])

app.factory("memeFetcher",memeFetcher)
app.controller("mainCtrl", mainCtrl)

function memeFetcher ($http) {

  var API_ROOT = 'memes'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
  }

}

function mainCtrl ($scope, memeFetcher,$http) {

  $scope.currentID = 1;
  $scope.meme = [];

  memeFetcher.get()
    .then(function (data) {
      $scope.meme = data;
      $scope.currentID = $scope.meme.length;
    })

  $scope.addMeme = function() {
    var formData = {id:$scope.currentID++,name:$scope.Name,avatarUrl:$scope.Url,likes:0};
    console.log(formData);
    var memeURL = 'memes';
    $http({
       url: memeURL,
       method: "POST",
       data: formData
    }).success(function(data, status, headers, config) {
      console.log("Post worked");
      location.reload();
    }).error(function(data, status, headers, config) {
      console.log("Post failed");
    });
  }

  $scope.incrementLikes = function(post) {
    var formData = {id:post.id};
    console.log(formData);
    var memeURL = 'memesUp';
    $http({
       url: memeURL,
       method: "POST",
       data: formData
    }).success(function(data, status, headers, config) {
      console.log("Post worked");
      location.reload();
    }).error(function(data, status, headers, config) {
      console.log("Post failed");
    });
  }
}
