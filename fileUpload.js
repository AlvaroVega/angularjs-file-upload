/**
 * A directive to manage file upload in an AngularJS application
 *
 * http://blog.brunoscopelliti.com/a-directive-to-manage-file-upload-in-an-angularjs-application
 */
directives.directive('fileUpload', [function() {
	return {
		restrict: 'EA',
		replace: false,
		scope: {
			action: '@',
			btnLabel: '@',
			btnClass: '@',
			inputName: '@',
			progressClass: '@',
			onSuccess: '&'
		},
		link: function(scope, elem, attrs, ctrl) {
			attrs.btnLabel = attrs.btnLabel || "Choose File";
			attrs.inputName = attrs.inputName || "file";
			attrs.btnClass = attrs.btnClass || "btn";
			attrs.progressClass = attrs.progressClass || "btn";

			elem.find('.fake-uploader').click(function() {
				elem.find('input[type="file"]').click();
			});
		},
		template: "<form \
			style='margin: 0;' \
			enctype='multipart/form-data'> \
			<div class='uploader'> \
				<input \
					type='file' \
					name='{{ inputName }}' \
					style='display: none;' \
					onchange='angular.element(this).scope().sendFile(this);'/> \
				<div class='btn-group'> \
					<button \
						class='{{ btnClass }} fake-uploader' \
						type='button' \
						readonly='readonly' \
						ng-model='avatar'>{{ btnLabel }}</button> \
					<button \
						disabled \
						class='{{ progressClass }}' \
						ng-class='{ \"btn-primary\": progress < 100, \"btn-success\": progress == 100 }' \
						ui-if=\"progress > 0\">{{ progress }}%</button>\
				</div> \
			</div> \
		</form>",
		controller: ['$scope', function ($scope) {
			$scope.progress = 0;
			$scope.avatar = '';

			$scope.sendFile = function(el) {
				var $form = $(el).parents('form');

				if ($(el).val() == '') {
					return false;
				}

				$form.attr('action', $scope.action);

				$scope.$apply(function() {
					$scope.progress = 0;
				});

				$form.ajaxSubmit({
					type: 'POST',
					uploadProgress: function(event, position, total, percentComplete) {

						$scope.$apply(function() {
							// upload the progress bar during the upload
							$scope.progress = percentComplete;
						});

					},
					error: function(event, statusText, responseText, form) {
						// remove the action attribute from the form
						$form.removeAttr('action');

						$scope.$apply(function () {
							$scope.onError({
								event: event,
								responseText: responseText,
								statusText: statusText,
								form: form,
							});
						});
					},
					success: function(responseText, statusText, xhr, form) {
						var ar = $(el).val().split('\\'),
							filename =  ar[ar.length-1];

						// remove the action attribute from the form
						$form.removeAttr('action');

						$scope.$apply(function () {
							$scope.onSuccess({
								responseText: responseText,
								statusText: statusText,
								xhr: xhr,
								form: form,
							});
						});

						$scope.progress = 0;
					},
				});
			}
		}],
	};
}]);
