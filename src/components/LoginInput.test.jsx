import { cleanup, render, screen } from '@testing-library/react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import LoginInput from './LoginInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

/**
 * skenario testing
 *
 * - LoginInput Component
 *   - should handle Email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

expect.extend(matchers);

describe('LoginInput Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle Email typing correctly', async () => {
    // arrange
    render(<LoginInput onLogin={() => {}} />);
    const EmailField = await screen.getByPlaceholderText('Email');
    // action
    await userEvent.type(EmailField, 'TestingEmail');
    // assert
    expect(EmailField).toHaveValue('TestingEmail');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput onLogin={() => {}} />);
    const PasswordField = await screen.getByPlaceholderText('Password');
    // action
    await userEvent.type(PasswordField, 'TestingPassword');
    // assert
    expect(PasswordField).toHaveValue('TestingPassword');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const MockedLoginFunction = vi.fn();
    render(<LoginInput onLogin={MockedLoginFunction} />);
    const EmailField = await screen.getByPlaceholderText('Email');
    await userEvent.type(EmailField, 'TestingEmail');
    const PasswordField = await screen.getByPlaceholderText('Password');
    await userEvent.type(PasswordField, 'TestingPassword');
    const LoginButton = await screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.click(LoginButton);

    // assert
    expect(MockedLoginFunction).toBeCalledWith({
      email: 'TestingEmail',
      password: 'TestingPassword',
    });
  });
});
