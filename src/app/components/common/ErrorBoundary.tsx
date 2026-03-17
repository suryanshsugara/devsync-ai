import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0F1A] text-[#F9FAFB] p-6">
          <div className="bg-[#111827] border border-[#2D3748] rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} color="#EF4444" />
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '24px', marginBottom: '12px' }}>Something went wrong</h2>
            <p className="text-[#9CA3AF] text-sm mb-8 leading-relaxed">
              We've encountered an unexpected error. Our team has been notified.
            </p>
            <div className="bg-[#0B0F1A] p-4 rounded-xl mb-8 text-left border border-[#2D3748]">
                <p className="text-xs font-mono text-red-400 break-all">{this.state.error?.message}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20"
            >
              <RefreshCw size={18} />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
