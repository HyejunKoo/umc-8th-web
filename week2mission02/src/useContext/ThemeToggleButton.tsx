import { useTheme, THEME } from './ThemeProvider';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 mt-4 rounded-md transition-all ${
        isLightMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {isLightMode ? '🌙 다크 모드' : '🌞 라이트 모드'}
    </button>
  );
}