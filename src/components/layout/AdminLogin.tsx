import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, LogOut } from 'lucide-react';

export function AdminLogin() {
  const { isAdmin, login, logout } = useAuth();
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 4) {
      setError(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(password);
      
      if (success) {
        setShowInput(false);
        setPassword('');
        setError(false);
      } else {
        setError(true);
        setPassword('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(true);
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdmin) {
    return (
      <button
        onClick={logout}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-card border border-border shadow-lg hover:bg-secondary transition-colors z-40"
        title="Logout"
      >
        <LogOut className="w-5 h-5 text-muted-foreground" />
      </button>
    );
  }

  return (
    <>
      {/* Login button */}
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-card border border-border shadow-lg hover:bg-secondary transition-colors z-40"
          title="Admin Login"
        >
          <Lock className="w-5 h-5 text-muted-foreground" />
        </button>
      )}

      {/* Login Modal */}
      {showInput && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-lg shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-heading font-semibold mb-4">Admin Access</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  className={`w-full px-4 py-2 rounded-md border ${
                    error ? 'border-destructive' : 'border-border'
                  } bg-background focus:border-accent focus:outline-none transition-colors disabled:opacity-50`}
                  autoFocus
                />
                {error && (
                  <p className="text-xs text-destructive mt-1">Incorrect password</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={password.length < 4 || isLoading}
                  className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowInput(false);
                    setPassword('');
                    setError(false);
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 border border-border rounded-md font-medium hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}