import  Knex from 'knex';

export async function seed(Knex: Knex){

    await Knex('items').insert([
        { title: 'Lampadas', image: 'Lampadas.svg'},
        { title: 'Pilhas e baterias', image: 'baterias.svg'},
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg.svg'},
        { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
        { title: 'Resídos Orgnâicos', image: 'organicos.svg'},
        { title: 'Óleo de cozinha', image: 'oleo.svg'},
    ])
}