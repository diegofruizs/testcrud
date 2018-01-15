(function (ng) {
    var mod = ng.module("authorModule");
    mod.constant("authorsContext", "api/authors");
    mod.controller('authorDetailCtrl', ['$scope', '$http', 'authorsContext', '$state',
        function ($scope, $http, authorsContext, $state) {
            if (($state.params.authorId !== undefined) && ($state.params.authorId !== null)) {
                $http.get(authorsContext + '/' + $state.params.authorId).then(function (response) {
                    $scope.booksRecords = response.data.books;
                    $scope.currentAuthor = response.data;
                });
            }
        }
    ]);
}
)(window.angular);