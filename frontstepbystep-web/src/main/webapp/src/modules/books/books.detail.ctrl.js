(function (ng) {
    var mod = ng.module("bookModule");
    mod.constant("booksContext", "api/books");
    mod.controller('bookDetailCtrl', ['$scope', '$http', 'booksContext', '$state',
        function ($scope, $http, booksContext, $state) {           
            if (($state.params.bookId !== undefined)&& ($state.params.bookId !== null)) {
                $http.get(booksContext + '/' + $state.params.bookId).then(function (response) {
                    $scope.currentBook = response.data;
                });
            }
        }
    ]);
}
)(window.angular);