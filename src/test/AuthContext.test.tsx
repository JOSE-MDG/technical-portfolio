import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function TestComponent() {
  const { isAdmin, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="admin-status">{isAdmin ? 'Admin' : 'Not Admin'}</div>
      <button onClick={() => login('test-password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should provide auth context', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('admin-status')).toHaveTextContent('Not Admin');
  });

  it('should throw error when used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleSpy.mockRestore();
  });

  it('should handle login correctly', async () => {
    const mockHash = 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3';
    vi.stubEnv('VITE_ADMIN_PASSWORD_HASH', mockHash);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText('Login');
    await act(async () => {
      loginButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('admin-status')).toBeInTheDocument();
    });
  });

  it('should handle logout correctly', async () => {
    localStorage.setItem('portfolio-admin', 'true');
    localStorage.setItem('portfolio-admin-timestamp', Date.now().toString());

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const logoutButton = screen.getByText('Logout');
    
    await act(async () => {
      logoutButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('admin-status')).toHaveTextContent('Not Admin');
    });
    
    expect(localStorage.getItem('portfolio-admin')).toBeNull();
  });

  it('should restore admin state from localStorage if valid', () => {
    localStorage.setItem('portfolio-admin', 'true');
    localStorage.setItem('portfolio-admin-timestamp', Date.now().toString());

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('admin-status')).toHaveTextContent('Admin');
  });

  it('should invalidate old sessions', () => {
    const oldTimestamp = Date.now() - (25 * 60 * 60 * 1000);
    localStorage.setItem('portfolio-admin', 'true');
    localStorage.setItem('portfolio-admin-timestamp', oldTimestamp.toString());

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('admin-status')).toHaveTextContent('Not Admin');
    expect(localStorage.getItem('portfolio-admin')).toBeNull();
  });
});