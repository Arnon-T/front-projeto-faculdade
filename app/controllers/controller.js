appFaculdade.controller('HomeCtrl', function($scope){
    $scope.titulo = 'Página inicial do projeto Boletim';
});

appFaculdade.controller('AlunoCadastroCtrl', function ($scope, $http) {
    $scope.aluno = {};
    $scope.listaAluno = [];
    $scope.pesquisaAluno = "";
    var url = 'http://localhost:8080/api/aluno/';

    $scope.salvarAluno = function () {
        var metodo = 'POST';

        $http({
            method: metodo,
            url: url + 'cadastrar',
            data: $scope.aluno
        }).then(function (response) {
            alert("Aluno cadastrado.")
            $scope.aluno = {};
        }, function (response) {
            console.log('Erro no cadastro.')
        });
    }

    $scope.listarAlunos = function () {
        var metodo = 'GET';
        var parametro = "";
        if ($scope.pesquisaAluno.length > 1) {
            parametro = "/busca/" + $scope.pesquisaAluno;
        }
        $http({
            method: metodo,
            url: url + 'selecionar/' + parametro,
        }).then(function (response) {
            $scope.listaAluno = response.data;
            $scope.aluno = [];
        }, function (response) {
            console.log('Erro ao buscar alunos.')
        });
    }

    $scope.buscaAluno = function (aluno) {
        var metodo = 'GET';
        $scope.aluno = aluno;
        $http({
            method: metodo,
            url: url + 'selecionar/' + $scope.aluno.id,
        }).then(function (response) {
            $scope.aluno = response.data;
        }, function (response) {
            console.log('Erro ao buscar aluno.')
        });
    }

    $scope.deleteAluno = function (index) {
        console.log($scope.aluno)
        $http({
            method: 'DELETE',
            url: url + 'deletar/' + $scope.aluno.id
        }).then(function () {
            console.log(index);
            $scope.listaAluno.splice(index, 1);
        }, function (response) {
            console.log('error do delete');
            console.log(response.data);
            console.log(response.status);
        });
    };

});

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

    }, function (response) {
        console.log('error');

    });

    $scope.listarNotas = function () {
        var metodo = 'GET';

        $http({
            method: metodo,
            url: url + 'selecionar/todos/' + $routeParams.id,
        }).then(function (response) {
            $scope.listaNota = response.data;
            console.log($scope.listaNota.length)
        }, function (response) {
            console.log('Erro ao buscar notas.')
        });
    }
    $scope.salvarNota = function () {
        var metodo = 'POST';
        $scope.nota.idAluno = $routeParams.id;
        $http({
            method: metodo,
            url: url + 'cadastrar',
            data: $scope.nota
        }).then(function (response) {
            alert("Nota cadastrada.")
            console.log($scope.nota.nota)
        }, function (response) {
            alert("Erro no cadastrado.")
            console.log('Erro no cadastro.')
        });
    }

    $scope.validaNota = function () {
        console.log('Validando nota')

        if ($scope.nota.nota == undefined) {
            $scope.nota.nota = 0;
            alert("Digite uma nota entre 0 e 10.")
        }
        if ($scope.nota.nota < 0) {
            $scope.nota.nota = 0;
            alert("Nota deve ser maior que 0.")
        }
        if ($scope.nota.nota > 10) {
            $scope.nota.nota = 0;
            alert("Nota deve ser maior que 10.")
        }
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
            console.log('Erro ao buscar nota.')
        });
    }

    $scope.deleteNota = function (index) {
        $http({
            method: 'DELETE',
            url: url + 'deletar/' + $scope.nota.id
        }).then(function () {
            console.log(index);
            $scope.listaNota.splice(index - 1, 1);            
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
            console.log('Busca boletim : ')
            console.log($scope.boletim)
        }), function () {
            console.log('Erro ao buscar boletim');
        }
    }

    $scope.exportBoletim = function () {
        date = new Date();
        date = date.getFullYear().toString();
        $scope.buscaBoletim();
        console.log('Exportando boletim')
        console.log('Boletim : ')
        console.log($scope.boletim)
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
            console.log('Aluno : ')
            console.log($scope.aluno)
            window.location.href = 'http://localhost:8080/api/boletim/export/' + $scope.aluno.nome + "/" + date
            console.log('Boletim gerado.')
        }), function () {
            alert('Não foi possível gerar o boletim.')
        }


    }

});

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
            url: url + 'atualizar/' + $scope.nota.id,
            data: $scope.notaDTO
        }).then(function (response) {
            alert("Nota atualizada.")
        }, function (response) {
            console.log($scope.nota)
            console.log('Erro no update.')
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



