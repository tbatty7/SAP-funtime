Feature: Work Order Operations
  As an SAP consumer
  I want to retrieve and update work orders through the mock ECC server
  So that I can verify integration behaviour without a live SAP system

  Scenario: Retrieve an existing work order
    Given the mock SAP server is running
    When I request work order "000004000001"
    Then the response RETURN type should be "S"
    And the response should contain 3 operations

  Scenario: Request a non-existent work order returns an error
    Given the mock SAP server is running
    When I request work order "000099999999"
    Then the response RETURN type should be "E"
    And the response RETURN message should contain "does not exist"

  Scenario: Update an operation field using CHANGE method type
    Given the mock SAP server is running
    When I send a CreateUpdate request for order "000004000003" with METHOD_TYPE "CHANGE" updating operation "0020" field "DESCRIPTION" to "Drain and flush gearbox"
    Then the response RETURN type should be "S"
    And when I retrieve work order "000004000003" the operation "0020" field "DESCRIPTION" should be "Drain and flush gearbox"

  Scenario: CreateUpdate only updates fields marked with X
    Given the mock SAP server is running
    When I send a CreateUpdate request for order "000004000001" with METHOD_TYPE "CHANGE" updating operation "0010" field "QUANTITY" to "9.9"
    Then the response RETURN type should be "S"
    And when I retrieve work order "000004000001" the operation "0010" field "QUANTITY" should be "9.9"
    And when I retrieve work order "000004000001" the operation "0010" field "DESCRIPTION" should be "Isolate and lock out pump P-101"
