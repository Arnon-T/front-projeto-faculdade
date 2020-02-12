appFaculdade.controller('NotaEditCtrl', function ($scope, $http, $routeParams) {
    $scope.listaNota = [];
    $scope.aluno = {};
    $scope.nota = {};
    $scope.notaDTO = {};

    var url = 'http://localhost:8080/api/nota/'

    $scope.buscaNota = function () {
        var metodo = 'GET';

        $http({
            method: metodo,
            url: url + 'selecionar/' + $routeParams.id,
        }).then(function (response) {
            $scope.nota = response.data;
            console.log('Buscando nota.')
        }, function (response) {
            console.log('Erro ao buscar notas.')
        });
    }

    $scope.updateNota = function () {
        var metodo = 'PUT';
        $scope.notaDTO.id = $scope.nota.id;
        $scope.notaDTO.idAluno = $scope.nota.aluno.id;
        $scope.notaDTO.idMateria = $scope.nota.materia.id;
        $scope.notaDTO.trimestre = $scope.nota.trimestre;
        $scope.notaDTO.nota = $scope.nota.nota;


        console.log($scope.nota)
        $http({
            method: metodo,
            url: url + 'atualizar/',
            data: $scope.notaDTO
        }).then(function (response) {
            alert("Nota atualizada.")
        }, function (response) {
            console.log($scope.nota)
            alert('Erro no update.')
        });
    }

    $scope.validaNota = function () {
        console.log('Validando nota')
        if ($scope.nota.nota == undefined) {
            $scope.nota.nota = 0;
            alert("Digite uma nota entre 0 e 10. Utilize vírgula (',').")
        }
    }

});