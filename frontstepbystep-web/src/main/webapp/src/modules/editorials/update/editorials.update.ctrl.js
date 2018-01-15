(
        function (ng) {
            var mod = ng.module("editorialModule");
            mod.constant("editorialsContext", "api/editorials");
            mod.constant("booksContext", "api/books");
            mod.controller('editorialUpdateCtrl', ['$scope', '$http', 'editorialsContext', '$state', 'booksContext', '$rootScope',
                function ($scope, $http, editorialsContext, $state, booksContext, $rootScope) {
                    $rootScope.edit = true;

                    $scope.data = {};

                    var idEditorial = $state.params.editorialId;

                    $http.get(editorialsContext + '/' + idEditorial).then(function (response) {
                        var editorial = response.data;
                        $scope.data.name = editorial.name;
                    });


                    $scope.createEditorial = function () {
                        $http.put(editorialsContext + "/" + idEditorial, $scope.data).then(function (response) {
                            $state.go('editorialsList', {editorialId: response.data.id}, {reload: true});
                        });
                    }
                }]);
        }
)(window.angular);