import { render } from '@testing-library/react';
import { WalletConnect } from '../WalletConnect';

// Mock the thirdweb dependencies
jest.mock('thirdweb', () => ({
  createThirdwebClient: jest.fn(() => ({
    // Add any necessary mock implementation
  })),
}));

jest.mock('thirdweb/react', () => ({
  ConnectButton: ({ connectButton }: { connectButton: { label: string } }) => (
    <button data-testid="connect-button">{connectButton.label}</button>
  ),
  darkTheme: jest.fn(() => ({})),
}));

jest.mock('thirdweb/wallets', () => ({
  inAppWallet: jest.fn(),
  createWallet: jest.fn(),
}));

describe('WalletConnect', () => {
  beforeEach(() => {
    // Clear mock implementations before each test
    jest.clearAllMocks();
  });

  it('renders the connect button with correct label', () => {
    const { getByTestId } = render(<WalletConnect />);
    const button = getByTestId('connect-button');
    expect(button).toHaveTextContent('Sign In');
  });

  // Add more tests as needed
}); 