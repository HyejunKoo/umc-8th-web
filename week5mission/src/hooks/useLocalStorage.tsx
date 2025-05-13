const useLocalStorage = (key: string) => {
  const getItem = () => localStorage.getItem(key);
  const setItem = (value: string) => localStorage.setItem(key, value);
  const removeItem = () => localStorage.removeItem(key);

  return { getItem, setItem, removeItem };
};

export default useLocalStorage;
