(function (ng) {
    var mod = ng.module("authorModule");
    mod.constant("authorsContext", "api/authors");
    mod.controller('authorCtrl', ['$scope', '$http', 'authorsContext', '$state',
        function ($scope, $http, authorsContext, $state) {
            $http.get(authorsContext).then(function (response) {
                $scope.authorsRecords = response.data;
            });
        }
    ]);
}
)(window.angular);