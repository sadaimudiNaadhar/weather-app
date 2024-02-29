
import { weatherApiResponse } from '../../src/MockResponse';
describe('Test Home Page before Weather station selection', () => {
  beforeEach(() => {
    // Visit the HomeView page before each test
    cy.visit('http://localhost:5173/')

    // Intercept GET request to python server URL
    cy.intercept('http://localhost:3000', weatherApiResponse)
  })

  it('renders v-select', () => {
    cy.get('.v-select').should('exist')


    // Open the v-select dropdown
    cy.get('.v-select').click();



    // Wait for the options to be visible
    cy.get('#vs1__listbox').should('be.visible');

    cy.get('.v-select input').type('P1');
    //cy.get('#vs1__listbox').select('P1');
    cy.contains('#vs1__listbox', 'P1').click();
  })
})

describe('Test Home Page after Weather station selection', () => {
  beforeEach(() => {
    // Visit the HomeView page before each test
    cy.visit('http://localhost:5173/')

    // Intercept GET request to python server URL
    cy.intercept('http://localhost:3000', weatherApiResponse)

    cy.get('.v-select').should('exist')

    // Open the v-select dropdown
    cy.get('.v-select').click();

    // Wait for the options to be visible
    cy.get('#vs1__listbox').should('be.visible');

    cy.get('.v-select input').type('P1');
    //cy.get('#vs1__listbox').select('P1');
    cy.contains('#vs1__listbox', 'P1').click();
  })


  it('renders TimeFilter', () => {
    cy.get('.time-selector').should('exist')
  })

  it('renders Weather Details', () => {
    cy.get('.weatherinfo-detail').should('exist')
  })

  it('renders Date Time', () => {
    cy.get('.w-info').should('exist')
  })

  it('renders weather station location map', () => {
    cy.get('#weatherStationLocationMap').should('exist')
  })

  it('renders road condition map', () => {
    cy.get('#roadConditionMap').should('exist')
  })
})