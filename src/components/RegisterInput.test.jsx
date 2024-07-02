import { cleanup, render, screen } from '@testing-library/react';
import {
 describe, it, expect, afterEach, vi,
} from 'vitest';
import RegisterInput from './RegisterInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

/**
 * skenario testing
 *
 * - RegisterInput Component
 *   - should handle Name typing correctly
 *   - should handle Email typing correctly
 *   - should handle password typing correctly
 *   - should call Register function when register button is clicked
 */

expect.extend(matchers);

describe('RegisterInput Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle Name typing correctly', async () => {
    // arrange
    render(<RegisterInput onRegister={() => {}} />);
    const NameField = await screen.getByPlaceholderText('Name');
    // action
    await userEvent.type(NameField, 'TestingName');
    // assert
    expect(NameField).toHaveValue('TestingName');
  });

  it('should handle Email typing correctly', async () => {
    // arrange
    render(<RegisterInput onRegister={() => {}} />);
    const EmailField = await screen.getByPlaceholderText('Email');
    // action
    await userEvent.type(EmailField, 'TestingEmail');
    // assert
    expect(EmailField).toHaveValue('TestingEmail');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput onRegister={() => {}} />);
    const PasswordField = await screen.getByPlaceholderText('Password');
    // action
    await userEvent.type(PasswordField, 'TestingPassword');
    // assert
    expect(PasswordField).toHaveValue('TestingPassword');
  });

  it('should call Register function when register button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput onRegister={mockRegister} />);
    const NameField = await screen.getByPlaceholderText('Name');
    await userEvent.type(NameField, 'TestingName');
    const EmailField = await screen.getByPlaceholderText('Email');
    await userEvent.type(EmailField, 'TestingEmail');
    const PasswordField = await screen.getByPlaceholderText('Password');
    await userEvent.type(PasswordField, 'TestingPassword');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // action
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      name: 'TestingName',
      email: 'TestingEmail',
      password: 'TestingPassword',
    });
  });
});
