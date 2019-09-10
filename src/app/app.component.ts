import { Component, OnInit } from '@angular/core';
import { CidadeService } from './cidade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  //Reference: https://www.npmjs.com/package/json-server
  //Install npm install -g json-server
  //Start Json Server
  //json-server --watch data/db.json

  cidades = [];

  constructor(private cidadeService: CidadeService){ }

  ngOnInit(){
    this.consultar();
  }

  consultar(){
    this.cidadeService.consultar()
    .then(dados => {
      this.cidades = dados;
    });
  }

  adicionar(nome: string){
    this.cidadeService.adicionar({nome})
    .then(cidade => {
      alert(` Cidade "${cidade.nome}" adicionada com códico "${cidade.id} !`);
      this.consultar();
    });
  }

  excluir(id: number){
    this.cidadeService.excluir(id)
    .then(() =>  {
      alert(` Cidade excluida com sucesso!`);
      this.consultar();
    });
  }

  atualizar(cidade: any){
    this.cidadeService.atualizar(cidade)
    .then(() => {
      alert('Cidade alterada com sucesso');
    })
    .catch(erro => {
      alert(erro);
    });

  }

}
