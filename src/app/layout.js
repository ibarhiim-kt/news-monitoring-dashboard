import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>     
        <Navbar/>
        <Header/>
        {children}
      </body>
    </html>
  );
}
