describe('Faculdade Tech Website', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    // Check main elements are present
    cy.get('header h1').should('contain', 'Faculdade Tech')
    cy.get('header p').should('contain', 'Construindo o Futuro com Tecnologia')
    cy.get('.container h2').should('contain', 'Bem-vindo à Faculdade Tech')
    cy.get('footer p').should('contain', '© 2025 Faculdade Tech - Todos os direitos reservados.')
    
    // Check page title
    cy.title().should('eq', 'Faculdade Tech')
  })

  it('should have working navigation menu', () => {
    // Check navigation links exist and are visible
    cy.get('nav a[href="cursos.html"]').should('be.visible').and('contain', 'Cursos')
    cy.get('nav a[href="#sobre"]').should('be.visible').and('contain', 'Sobre')
    cy.get('nav a[href="#contato"]').should('be.visible').and('contain', 'Contato')
  })

  it('should have the main call-to-action button', () => {
    cy.get('a.btn')
      .should('be.visible')
      .and('contain', 'Saiba Mais')
      .and('have.attr', 'href', 'cursos.html')
  })

  it('should navigate to courses page when clicking the CTA button', () => {
    cy.get('a.btn').click()
    cy.url().should('include', '/cursos.html')
    cy.get('h2').should('contain', 'Lista de Cursos')
  })

  it('should navigate to courses page via navigation', () => {
    cy.get('nav a[href="cursos.html"]').click()
    cy.url().should('include', '/cursos.html')
    cy.get('h2').should('contain', 'Lista de Cursos')
  })

  it('should have proper CSS styling applied', () => {
    cy.get('header').should('have.css', 'background-color', 'rgb(51, 51, 51)')
    cy.get('nav').should('have.css', 'background-color', 'rgb(68, 68, 68)')
    cy.get('body').should('have.css', 'font-family').and('include', 'Arial')
  })
})

describe('Courses Page', () => {
  beforeEach(() => {
    cy.visit('/cursos.html')
  })

  it('should load the courses page successfully', () => {
    // Check main elements are present
    cy.get('header h1').should('contain', 'Faculdade Tech')
    cy.get('h2').should('contain', 'Lista de Cursos')
    cy.get('#tabelaCursos').should('be.visible')
    
    // Check page title
    cy.title().should('eq', 'Faculdade Tech')
  })

  it('should display the course table with proper structure', () => {
    // Check table headers
    cy.get('#tabelaCursos thead th').should('have.length', 3)
    cy.get('#tabelaCursos thead th').eq(0).should('contain', 'Curso')
    cy.get('#tabelaCursos thead th').eq(1).should('contain', 'Período')
    cy.get('#tabelaCursos thead th').eq(2).should('contain', 'Módulo')
  })

  it('should display all expected courses', () => {
    const expectedCourses = [
      'Ciências da Computação',
      'Medicina', 
      'Direito',
      'Odonto',
      'Veterinario',
      'Administração'
    ]
    
    expectedCourses.forEach(course => {
      cy.get('#tabelaCursos tbody').should('contain', course)
    })
  })

  it('should have Bootstrap and DataTables loaded', () => {
    // Check that external libraries are loaded
    cy.window().should('have.property', 'jQuery')
    cy.get('#tabelaCursos').should('have.class', 'table')
    cy.get('#tabelaCursos').should('have.class', 'table-striped')
  })

  it('should have DataTables pagination working', () => {
    // Wait for DataTables to initialize and check pagination
    cy.get('#tabelaCursos_wrapper').should('be.visible')
    cy.get('#tabelaCursos_info').should('be.visible')
  })

  it('should have proper navigation back to home', () => {
    // Test that navigation still works from courses page
    cy.get('nav a[href="#sobre"]').should('be.visible')
    cy.get('nav a[href="#contato"]').should('be.visible')
  })
})