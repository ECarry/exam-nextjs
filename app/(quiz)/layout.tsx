const QuizLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-dvh">
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
  );
};

export default QuizLayout;