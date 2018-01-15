(function (ng) {
    var mod = ng.module("editorialModule");
    mod.constant("editorialsContext", "api/editorials");
    mod.controller('editorialNewCtrl', ['$scope', '$http', 'editorialsContext', '$state', '$rootScope',
        function ($scope, $http, editorialsContext, $state, $rootScope) {
            $rootScope.edit = false;

            $scope.data = {};

            $scope.createEditorial = function () {
                $http.post(editorialsContext, $scope.data).then(function (response) {
                    $state.go('editorialsList', {editorialId: response.data.id}, {reload: true});
                });
            };
        }
    ]);
}
)(window.angular);