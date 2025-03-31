# NFT Factory Contract Tests

This directory contains comprehensive test files for the NFT Factory contract, focusing on backend tests to ensure the contract functions as expected before integrating with the frontend.

## Test Structure

The tests are organized into the following categories:

1. **Unit Tests** (`NFTFactory.t.sol`) - Basic functionality tests for the factory contract
2. **Integration Tests** (`ERC721Integration.t.sol`) - End-to-end flow tests with ERC721Drop contracts
3. **Security Tests** (`Security.t.sol`) - Tests focused on security aspects like reentrancy protection
4. **Mock Contracts** (`MockContracts.sol`) - Mock implementations of ThirdWeb contracts for testing
5. **Reentrancy Attacker** (`ReentrancyAttacker.sol`) - Contract to simulate reentrancy attacks

## Running Tests

To run the tests, you need to have [Foundry](https://book.getfoundry.sh/) installed. Follow these steps:

### 1. Install Foundry

If you haven't installed Foundry yet:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 2. Build the Project

From the project root:

```bash
forge build
```

### 3. Run Individual Test Files

```bash
# Run all tests in the NFTFactory test file
forge test --match-path test/NFTFactory.t.sol -vv

# Run all tests in the ERC721Integration test file
forge test --match-path test/ERC721Integration.t.sol -vv

# Run all tests in the Security test file
forge test --match-path test/Security.t.sol -vv
```

### 4. Run All Tests

```bash
# Run all tests in the test directory
forge test -vv

# Or use the test runner (which runs all tests in sequence)
forge test --match-path test/Runner.t.sol -vv
```

## Test Coverage

To generate a test coverage report:

```bash
forge coverage
```

## Gas Report

To generate a gas report for contract functions:

```bash
forge test --gas-report
```

## Environment Variables

The tests use the following environment variables:

- `FACTORY_ADDRESS`: The deployed factory contract address (for integration tests)
- `FEE_RECIPIENT`: The address to receive deployment fees

You can set these variables in a `.env` file and load them using:

```bash
source .env
forge test
```

## Adding New Tests

When adding new tests:

1. Create a new test file in the `test/` directory
2. Import the necessary dependencies
3. Update the `Runner.t.sol` file to include your new tests
4. Run the tests to ensure they pass

## Test Categories

### Basic Tests

These test the core functionality of the NFT Factory contract:

- Constructor validation
- Collection deployment
- Fee management
- Access control

### Integration Tests

These test the end-to-end user flow:

- Collection deployment
- NFT lazy minting
- NFT claiming
- Royalty information

### Security Tests

These focus on security aspects:

- Reentrancy protection
- Input validation
- Fee handling
- Pause functionality
- Ownership transfer 