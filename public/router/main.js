 // Função para carregar componentes HTML
 function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error(`Erro ao carregar ${url}:`, error));
}

// Carregar o header e footer
loadComponent("header", "header.html");
loadComponent("footer", "footer.html");
loadComponent("SecPortifolio", "SecPortifolio.html");
loadComponent("secavalia", "secavalia.html");