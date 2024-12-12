/* eslint-disable new-cap */
/* eslint-disable camelcase */
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-ibm-blue overscroll-none flex justify-center items-center flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
