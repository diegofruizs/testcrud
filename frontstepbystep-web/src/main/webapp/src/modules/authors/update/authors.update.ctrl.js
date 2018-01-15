(
        function (ng) {
            var mod = ng.module("authorModule");
            mod.constant("authorsContext", "api/authors");
            mod.constant("booksContext", "api/books");
            mod.controller('authorUpdateCtrl', ['$scope', '$http', 'authorsContext', '$state', 'booksContext', '$rootScope',
                function ($scope, $http, authorsContext, $state, booksContext, $rootScope) {
                    $rootScope.edit = true;

                    $scope.data = {};

                    $scope.selectedItems = [];

                    $scope.availableItems = [];

                    var idAuthor = $state.params.authorId;

                    //Consulto el autor a editar.
                    $http.get(authorsContext + '/' + idAuthor).then(function (response) {
                        var author = response.data;
                        $scope.data.name = author.name;
                        $scope.data.birthDate = new Date(author.birthDate);
                        $scope.data.description = author.description;
                        $scope.data.image = author.image;
                        $scope.getBooks(author.books);
                    });

                    /*
                     * Esta función recibe como param los books que tiene el autor para hacer un filtro visual con todos los books que existen.
                     * @param {type} books
                     * @returns {undefined}
                     */
                    $scope.getBooks = function (books) {
                        
                        $http.get(booksContext).then(function (response) {

                            $scope.allBooks = response.data;
                            $scope.booksAuthor = books;

                            var filteredBooks = $scope.allBooks.filter(function (book) {
                                return $scope.booksAuthor.filter(function (bookAuthor) {
                                    return bookAuthor.id === book.id;
                                }).length === 0;
                            });

                            var unFilteredBooks= $scope.allBooks.filter(function (book) {
                                return $scope.booksAuthor.filter(function (bookAuthor) {
                                    return bookAuthor.id === book.id;
                                }).length !== 0;
                            });

                            if ($scope.booksAuthor.length === 0) {
                                
                                $scope.availableItems = $scope.allBooks;
                                
                            } else {
                                
                                $scope.selectedItems = unFilteredBooks;
                                $scope.availableItems = filteredBooks;
                            }


                        });
                    };

                    $scope.createAuthor = function () {
                        $http.put(authorsContext + "/" + idAuthor, $scope.data).then(function (response) {
                            if ($scope.selectedItems.length >= 0) {
                                $http.put(authorsContext + "/" + response.data.id + "/books", $scope.selectedItems).then(function (response) {
                                });
                            }
                            //Author created successfully
                            $state.go('authorsList', {authorId: response.data.id}, {reload: true});
                        });
                    };
                }
            ]);
        }
)(window.angular);