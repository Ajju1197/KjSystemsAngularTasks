angular.module('imageUploadModule', [])
  .controller('imageUploadController', function ($scope) {
  $scope.uploadImage = function(element) {
    var files = element.files;
    if (files && files.length) {
      var file = files[0];
      if (file.size <= 5000000) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.image = e.target.result;
          $scope.$apply();
        };
        reader.readAsDataURL(file);
        $scope.alertMessage = false;
      } else {
        $scope.image = "";
        document.getElementById("image").value = "";
        alert('Please upload an image that is smaller than 5MB.')
        $scope.$apply();
      }
    }
  };
  $scope.clearImage = function() {
    $scope.image = "";
    document.getElementById("image").value = "";
  };
})
