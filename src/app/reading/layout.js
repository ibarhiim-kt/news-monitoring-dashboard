import Header from "@/app/components/Header";

export default function ReadingLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
