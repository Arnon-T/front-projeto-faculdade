appFaculdade.config(function($routeProvider){

    $routeProvider
    .when('/', {templateUrl : 'app/views/home.html', controller  : 'HomeCtrl',})

    .when('/aluno', {templateUrl : 'app/views/aluno.html', controller  : 'AlunoCadastroCtrl',})
    .when('/aluno-cad', {templateUrl : 'app/views/aluno-cad.html', controller  : 'AlunoCadastroCtrl',})
    .when('/aluno-editar/:id', {templateUrl : 'app/views/aluno-edit.html', controller  : 'AlunoEditCtrl',})

    .when('/nota/:id', {templateUrl : 'app/views/nota.html', controller  : 'NotaCtrl',})
    .when('/nota-cad/:id', {templateUrl : 'app/views/nota-cad.html', controller  : 'NotaCtrl',})
    .when('/nota-edit/:id', {templateUrl : 'app/views/nota-edit.html', controller  : 'NotaEditCtrl',})

    .otherwise ({ redirectTo: '/' });
});