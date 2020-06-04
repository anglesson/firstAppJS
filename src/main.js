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
        console.log(repoInput)
        if(repoInput.length === 0)
            return;

        const response = await api.get(`/repos/${repoInput}`);

        console.log(response);
        const {name, description, link_url, owner: {avatar_url}} = response.data;

        this.repositories.push({
            name,
            description,
            avatar_url,
            link_url
        });
        this.inputElement.value = '';
        this.render();
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
            aEl.setAttribute('href', repo.link_url);
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