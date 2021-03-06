(function (ng) {
    var mod = ng.module("editorialModule", ['ui.router']);
    mod.constant("editorialsContext", "api/editorials");
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/editorials/';
            var basePathBooks = 'src/modules/books/';
            $urlRouterProvider.otherwise("/editorialsList");
            $stateProvider.state('editorials', {
                url: '/editorials',
                abstract: true,
                views: {
                    'mainView': {
                        templateUrl: basePath + 'editorials.html',
                        controller: 'editorialCtrl',
                        controllerAs: 'ctrl'
                    }
                }
                ,
                data: {
                    requireLogin: false,
                    roles: ['admin', 'assistant']
                }
            }).state('editorialsList', {
                url: '/list',
                parent: 'editorials',
                views: {
                    'listView': {
                        templateUrl: basePath + 'editorials.list.html'
                    }
                }
            }).state('editorialDetail', {
                url: '/{editorialsId:int}/detail',
                parent: 'editorials',
                param: {
                    editorialsId: null
                },
                views: {
                    'listView': {
                        templateUrl: basePathBooks + 'books.list.html',
                        controller: 'editorialDetailCtrl',
                        controllerAs: 'ctrl'
                    },
                    'detailView': {
                        templateUrl: basePath + 'editorials.detail.html',
                        controller: 'editorialDetailCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            }).state('editorialsCreate', {
                url: '/create',
                parent: 'editorials',
                views: {
                    'detailView': {
                        templateUrl: basePath + '/new/editorials.new.html',
                        controller: 'editorialNewCtrl'
                    }
                }
                ,
                data: {
                    requireLogin: true,
                    roles: ['admin']
                }
            }).state('editorialUpdate', {
                url: '/update/{editorialId:int}',
                parent: 'editorials',
                param: {
                    editorialId: null
                },
                views: {
                    'detailView': {
                        templateUrl: basePath + '/new/editorials.new.html',
                        controller: 'editorialUpdateCtrl'
                    }
                }
                ,
                data: {
                    requireLogin: true,
                    roles: ['admin']
                }
            }).state('editorialDelete', {
                url: '/delete/{editorialId:int}',
                parent: 'editorials',
                param: {
                    editorialId: null
                },
                views: {
                    'detailView': {
                        templateUrl: basePath + '/delete/editorials.delete.html',
                        controller: 'editorialDeleteCtrl'
                    }
                }
                ,
                data: {
                    requireLogin: true,
                    roles: ['admin', 'assistant']
                }
            });
        }]);
})(window.angular);
