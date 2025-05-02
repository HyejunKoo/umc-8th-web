import { ThemeProvider } from './ThemeProvider';
import ThemeToggleButton from './ThemeToggleButton';
import ThemeContent from './ThemeContent';

export default function ContextPage() {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main>
          <ThemeToggleButton />
          <ThemeContent />
        </main>
      </div>
    </ThemeProvider>
  );
}

