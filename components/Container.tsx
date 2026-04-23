function Container({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`container mx-auto px-4 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
