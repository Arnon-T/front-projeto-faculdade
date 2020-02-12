appFaculdade.controller('NotaCtrl', function ($scope, $http, $routeParams) {
    $scope.listaNota = [];
    $scope.aluno = {};
    $scope.nota = {};
    $scope.boletim = {};
    $scope.boletimDelete = {};

    var url = 'http://localhost:8080/api/nota/'

    $http.get('http://localhost:8080/api/aluno/selecionar/' + $routeParams.id).then(function (response) {
        $scope.aluno = response.data;

        console.log('success');

    }, function () {
        console.log('error');

    });

    $scope.listarNotas = function () {
        var metodo = 'GET';

        $http({
            method: metodo,
            url: url + 'selecionar/todos/' + $routeParams.id,
        }).then(function (response) {
            $scope.listaNota = response.data;
        }, function () {
            console.log('Notas não encontradas.')
        });
    }
    $scope.salvarNota = function () {
        var metodo = 'POST';
        $scope.nota.idAluno = $routeParams.id;
        if ($scope.validaNota()) {
            $http({
                method: metodo,
                url: url + 'cadastrar',
                data: $scope.nota
            }).then(function () {
                alert("Nota cadastrada.")
                history.go(-1);
            }, function () {
                alert("Erro no cadastrado.")
            });
        }

    }

    $scope.validaNota = function () {
        console.log('Validando nota')
        if ($scope.nota.nota == undefined) {
            $scope.nota.nota = 0;
            alert("Digite uma nota entre 0 e 10.")
            return false;
        }
        if ($scope.nota.nota < 0) {
            $scope.nota.nota = 0;
            alert("Nota deve ser maior que 0.")
            return false;
        }
        if ($scope.nota.nota > 10) {
            $scope.nota.nota = 0;
            alert("Nota deve ser maior que 10.")
            return false;
        }
        return true;
    }

    $scope.habilitaBoletim = function () {
        if ($scope.listaNota.length == 28) {
            return true;
        } else {
            return false;
        }
    }

    $scope.buscaNota = function (nota) {
        var metodo = 'GET';
        $scope.nota = nota;
        $http({
            method: metodo,
            url: url + 'selecionar/' + $scope.nota.id,
        }).then(function (response) {
            $scope.nota = response.data;
        }, function (response) {
            alert('Erro ao buscar nota.')
        });
    }

    $scope.deleteNota = function () {
        var index;
        $http({
            method: 'DELETE',
            url: url + 'deletar/' + $scope.nota.id
        }).then(function () {
            for (var i = 0; i < $scope.listaNota.length; i++) {
                if ($scope.listaNota[i].id == $scope.nota.id) {
                    index = i;
                }
            }
            $scope.listaNota.splice(index, 1);
        }, function (response) {
            if (response.status === 500) {
                alert('Não foi possível deletar. Nota vinculada com um boletim.')
            }
        });

    };

    $scope.buscaBoletim = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/boletim/' + $scope.aluno.id
        }).then(function (response) {
            $scope.boletim = response.data;
        }), function () {
            alert('Erro ao buscar boletim');
        }
    }

    $scope.exportBoletim = function () {
        date = new Date();
        date = date.getFullYear().toString();
        $scope.buscaBoletim();
        console.log('Exportando boletim')
        if ($scope.boletim !== undefined) {
            console.log('Entrou no if')
            $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/boletim/deletar/' + $scope.aluno.id + "/" + date
            })
        }
        $http({
            method: 'POST',
            url: 'http://localhost:8080/api/boletim/gerar/' + $scope.aluno.id + "/" + date
        }).then(function (response) {
            $scope.boletim = response.data;
            window.location.href = 'http://localhost:8080/api/boletim/export/' + $scope.aluno.nome + "/" + date
            alert('Boletim gerado.')
        }), function () {
            alert('Não foi possível gerar o boletim.')
        }


    }

});