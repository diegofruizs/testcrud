(function (ng) {
    var mod = ng.module("editorialModule");
    mod.constant("editorialsContext", "api/editorials");
    mod.controller('editorialDeleteCtrl', ['$scope', '$http', 'editorialsContext', '$state',
        function ($scope, $http, editorialssContext, $state) {
            var idEditorial = $state.params.editorialId;
            $scope.deleteEditorial = function () {
                $http.delete(editorialssContext + '/' + idEditorial, {}).then(function (response) {
                    $state.go('editorialsList', {editorialsId: response.data.id}, {reload: true});
                });
            };
        }
    ]);
}
)(window.angular);