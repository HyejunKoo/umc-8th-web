import { useTheme, THEME } from './ThemeProvider';

export default function ThemeContent() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className={`p-4 h-dvh w-full ${isLightMode ? 'bg-white' : 'bg-gray-800'}`}>
      <h1 className={`text-2xl font-bold ${isLightMode ? 'text-black' : 'text-white'}`}>
        Theme Content
      </h1>
      <p className={`mt-4 ${isLightMode ? 'text-gray-700' : 'text-gray-300'}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores placeat dolorum magni
        facere vel sequi itaque obcaecati.
      </p>
    </div>
  );
}