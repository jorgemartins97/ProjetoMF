describe('Project View', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
  });
})

describe('Project test', () => {
  beforeEach(() => {
    // Visit the page or navigate to the component if needed
    cy.visit('/');
  });

  it('should have an input field with ID "searchInput"', () => {
    cy.get('#searchInput').should('exist');
  });

  it('should have a button with ID "searchButton"', () => {
    cy.get('#searchButton').should('exist');
  });

  it('Deve permitir inserir texto na barra de pesquisa', () => {
    const searchText = 'Teste de pesquisa';
    cy.get('#searchInput').type(searchText).should('have.value', searchText);
  });

  it('Deve filtrar resultados ao clicar no botão de pesquisa', () => {
    const searchText = 'Teste de pesquisa';
    cy.get('#searchInput').type(searchText);
    cy.get('#searchButton').click();   
  });

  it('Deve exibir a tabela de projetos corretamente', () => {
    // Verifica se a tabela está visível
    cy.get('table').should('be.visible');

    // Verifica se os cabeçalhos da tabela estão presentes e contêm o texto esperado
    cy.get('thead th').should('have.length', 3);
    cy.get('thead th').eq(0).should('contain', 'Name');
    cy.get('thead th').eq(1).should('contain', 'Start Date');
    cy.get('thead th').eq(2).should('contain', 'End Date');

  });

  it('should have a add button', () => {
    cy.get('#add-project-button').should('exist');
  });

  // Verificar se o formulário de add de projeto está visível
  it('Open and close add form', () => {
    cy.get('#add-project-button').click();
    cy.get('.add-project-form').should('exist')
    cy.get('.close').click();
    cy.get('.add-project-form').should('not.exist')
  });

  it('should have fields', () => {
    cy.get('#add-project-button').click();
    cy.get('#new-project').should('exist');
    cy.get('#start-date').should('exist');
    cy.get('#end-date').should('exist');
  });
  
});

describe('Should add a project', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('Should add a project when click add', () => {
    cy.get('#add-project-button').click();
    //Preenche os campos para adicionar um projeto
    cy.get('#new-project').type('Projeto1000');
    cy.get('#start-date').type('2024-06-20');
    cy.get('#end-date').type('2024-06-25');
    //submeter o formulario 
    cy.get('#buttonAdd').click();

  });

  it('Should add a project and increase table size by 1', () => {
    const randomProjeto = `new-project${Math.floor(Math.random() * 1000000)}`;
    // Conta o número de linhas na tabela antes de adicionar um projeto
    cy.get('table tbody tr').its('length').then((initialRowCount) => {
      // Clica no botão para adicionar um projeto
      cy.get('#add-project-button').click();
      // Preenche os campos para adicionar a projeto
      cy.get('#new-project').type(randomProjeto);
      cy.get('#start-date').type('2024-05-20');
      cy.get('#end-date').type('2024-05-25');
      // Submete o formulário
      cy.get('#buttonAdd').click();
      // Verifica se o projeto foi adicionada corretamente
      cy.contains('td', 'Projeto').should('exist');
      // Verifica se o número de linhas na tabela aumentou em 1
      cy.get('table tbody tr').should('have.length', initialRowCount + 1);
    });
  });
  
    it('Should display an error message when adding a project with an existing name', () => {
      // Adiciona um projeto com um nome já existente
      cy.get('#add-project-button').click();
      cy.get('#new-project').type('Projeto Existente');
      cy.get('#start-date').type('2024-05-20');
      cy.get('#end-date').type('2024-05-25');
      cy.get('#buttonAdd').click();
      
      // Tenta adicionar outro projeto com o mesmo nome
      cy.get('#add-project-button').click();
      cy.get('#new-project').type('Projeto Existente');
      cy.get('#start-date').type('2024-05-26'); // Data inicial diferente
      cy.get('#end-date').type('2024-05-30');
      cy.get('#buttonAdd').click();
  
      // Verifica se o projeto duplicado não foi adicionado à tabela
      cy.get('table').contains('td', 'Projeto Existente').should('have.length', 1);
    });

});
