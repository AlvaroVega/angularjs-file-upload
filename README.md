angularjs-file-upload
=====================

Easy file upload with simple progress.

----------

**Dependencies**

 - jquery.form.js
 - jquery.js

----------

**Usage**

```html
<!-- view.html -->
<div
  file-upload
  action='/api/v1/serie/image/{{ main.serie.id }}'
  btn-class='btn btn-small'
  btn-label="Choose Image"
  input-name="image"
  on-success='serieImageUploaded(responseText)'
  progress-class='btn btn-small'></div>
```

```js
// ctrl.js
$scope.serieImageUploaded = function (resp) {
  var data = angular.fromJson(resp);
  $scope.main.serie.image = data.serie.image;
  $scope.main.serie.banner_tile_image = data.serie.banner_tile_image;
}
```

----------

**Example**

![enter image description here][1]


----------

**Credits**

  - [**A directive to manage file upload in an AngularJS application**][2]


  [1]: http://i.imgur.com/dgxHQqE.png
  [2]: http://blog.brunoscopelliti.com/a-directive-to-manage-file-upload-in-an-angularjs-application
