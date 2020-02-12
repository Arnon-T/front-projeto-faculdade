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
            console.log(response.status)
            console.log('Erro no cadastro.')
        });
    }

    $scope.listarAlunos = function () {
        var metodo = 'GET';
        var parametro = "";
        console.log($scope.pesquisaAluno)
        if ($scope.pesquisaAluno.length > 0) {
            parametro = "busca/" + $scope.pesquisaAluno;
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
        $http({
            method: 'DELETE',
            url: url + 'deletar/' + $scope.aluno.id
        }).then(function () {
            for(var i = 0; i < $scope.listaAluno.length; i++){
                if($scope.listaAluno[i].id == $scope.aluno.id){
                    index = i;
                }
            }
            $scope.listaAluno.splice(index, 1);            
        }, function (response) {
            console.log('error do delete');
            console.log(response.data);
            console.log(response.status);
        });
    };

    $scope.validateTelefone = function() {
        if($scope.aluno.telefone.length > 11){
            alert("Digite um telefone válido. (99) 99999-9999")
        }
    }

});