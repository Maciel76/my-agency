document.getElementById('form-avaliacao').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const empresa = document.getElementById('empresa').value;
    const avaliacao = document.getElementById('avaliacao').value;
    const foto = document.getElementById('foto').files[0];

    // Aqui você pode adicionar a lógica para enviar a avaliação para o servidor ou exibi-la na página
    console.log({ nome, empresa, avaliacao, foto });

    alert('Avaliação enviada com sucesso!');
    document.getElementById('form-avaliacao').reset();
});