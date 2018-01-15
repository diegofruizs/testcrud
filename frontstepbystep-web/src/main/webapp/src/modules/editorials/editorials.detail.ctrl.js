(function (ng) {
    var mod = ng.module("editorialModule");
    mod.constant("editorialContext", "api/editorials");
    mod.controller('editorialDetailCtrl', ['$scope', '$http', 'editorialContext', '$state',
        function ($scope, $http, editorialContext, $state) {
            if (($state.params.editorialsId !== undefined)&& ($state.params.editorialsId !== null)) {
                $http.get(editorialContext + '/' + $state.params.editorialsId).then(function (response) {
                    $scope.booksRecords = response.data.books;
                    $scope.currentEditorial = response.data;
                });
            }
        }
    ]);
}
)(window.angular);