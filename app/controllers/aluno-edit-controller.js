appFaculdade.controller('AlunoEditCtrl', function ($scope, $http, $routeParams) {
    $scope.alunoDetalhe = {};
    var url = 'http://localhost:8080/api/aluno/'

    $http.get(url + 'selecionar/' + $routeParams.id).then(function (response) {
        $scope.alunoDetalhe = response.data;

        console.log('success');


    }, function (response) {
        console.log('error');

    });

    $scope.updateAluno = function () {
        var metodo = 'PUT';

        $http({
            method: metodo,
            url: url + 'atualizar/' + $scope.alunoDetalhe.id,
            data: $scope.alunoDetalhe
        }).then(function (response) {
            alert("Aluno atualizado.")
            $scope.aluno = {};
        }, function (response) {
            console.log('Erro no update.')
        });
    }

});




