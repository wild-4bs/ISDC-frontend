export const formatRelativeTime = (date: string) => {
  const diffInMinutes = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 60000,
  );

  if (diffInMinutes < 1) return "الآن";
  if (diffInMinutes < 60) return `منذ ${diffInMinutes}د`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `منذ ${diffInHours}س`;

  return new Date(date).toLocaleDateString("ar-EG");
};

export const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("ar-IQ-u-nu-latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
