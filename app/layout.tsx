import type { Metadata } from"next";
import"../src/index.css";
import"../src/fonts.css";
import ClientProviders from"./providers";

export const metadata: Metadata = {
 metadataBase: new URL(
 process.env.NEXT_PUBLIC_SITE_URL ||"https://easewaymedicare.co.uk"
 ),
 title:
">Easeway Medicare Physiotherapy Clinic - Professional Physiotherapy Services in Whittlesey",
 description:
">Overcome pain, regain mobility and live life to the fullest easily! Professional physiotherapy services including manual therapy, electrotherapy, sports massage and home physiotherapy care in Whittlesey, Peterborough.",
 keywords:
">physiotherapy, physiotherapist, manual therapy, electrotherapy, sports massage, home physiotherapy, Whittlesey, Peterborough, pain relief, mobility, rehabilitation",
 openGraph: {
 title:"Easeway Medicare Physiotherapy Clinic",
 description:
">Professional physiotherapy services in Whittlesey, Peterborough",
 url:"https://easewaymedicare.co.uk",
 siteName:"Easeway Medicare Physiotherapy Clinic",
 images: [
 {
 url:"/images/easeway_logo.png",
 width: 800,
 height: 600,
 alt:"Easeway Medicare Logo",
 },
 ],
 locale:"en_US",
 type:"website",
 },
 twitter: {
 card:"summary_large_image",
 title:"Easeway Medicare Physiotherapy Clinic",
 description:
">Professional physiotherapy services in Whittlesey, Peterborough",
 images: ["/images/easeway_logo.png"],
 },
 robots: {
 index: true,
 follow: true,
 },
 alternates: {
 canonical:"https://easewaymedicare.co.uk",
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en">
 <head>
 <meta
 name="viewport"
 content="width=device-width, initial-scale=1, maximum-scale=5"
 />
 <meta name="format-detection" content="telephone=yes" />
 <meta name="mobile-web-app-capable" content="yes" />
 <meta name="apple-mobile-web-app-capable" content="yes" />
 <meta name="apple-mobile-web-app-status-bar-style" content="default" />
 </head>
 <body>
 <ClientProviders>{children}</ClientProviders>
 </body>
 </html>
 );
}
