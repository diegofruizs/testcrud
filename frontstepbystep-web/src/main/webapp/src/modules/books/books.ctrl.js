(function (ng) {
    var mod = ng.module("bookModule");
    mod.constant("booksContext", "api/books");
    mod.controller('bookCtrl', ['$scope', '$http', 'booksContext', '$state',
        function ($scope, $http, booksContext, $state) {
            $http.get(booksContext).then(function (response) {
                $scope.booksRecords = response.data;
            });
        }
    ]);
}
)(window.angular);