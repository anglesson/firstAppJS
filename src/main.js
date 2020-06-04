import api from './api';

class App {
    constructor(){
        this.repositories = [];

        this.formElement = document.getElementById('repo-form');
        this.inputElement = document.getElementById('repository');
        this.ulElement = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers(){
        this.formElement.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputElement.value;
        
        if(repoInput.length === 0)
            return false;
        this.setLoad();
        try{
            const response = await api.get(`/repos/${repoInput}`);
            
            const {name, description, html_url, owner: {avatar_url}} = response.data;

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });

            this.inputElement.value = '';
            this.render();
        } catch(err){
            alert('Repositório não encontrado!');
        }
        this.setLoad(false);
    }

    setLoad(value = true){
        if(value === true){
            let spanEl = document.createElement('span');
            spanEl.setAttribute('id', 'loading');
            spanEl.appendChild(document.createTextNode('Carregando...'));
            this.ulElement.appendChild(spanEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    render(){
        this.ulElement.innerHTML = '';
        this.repositories.forEach((repo) => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let pEl = document.createElement('p');
            pEl.appendChild(document.createTextNode(repo.description));

            let aEl = document.createElement('a');
            aEl.setAttribute('target', '_blank');
            aEl.setAttribute('href', repo.html_url);
            aEl.appendChild(document.createTextNode('Acessar'));

            let strongEl = document.createElement('strong');
            strongEl.appendChild(document.createTextNode(repo.name));

            let liEl = document.createElement('li');
            liEl.appendChild(imgEl);
            liEl.appendChild(strongEl);
            liEl.appendChild(pEl);
            liEl.appendChild(aEl);

            this.ulElement.appendChild(liEl);
        });
    }
}

new App();