import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Easeway Medicare Physiotherapy Clinic - Professional Physiotherapy Services in Whittlesey",
  description = "Overcome pain, regain mobility and live life to the fullest easily! Professional physiotherapy services including manual therapy, electrotherapy, sports massage and home physiotherapy care in Whittlesey, Peterborough.",
  keywords = "physiotherapy, physiotherapist, manual therapy, electrotherapy, sports massage, home physiotherapy, Whittlesey, Peterborough, pain relief, mobility, rehabilitation",
  image = "/images/easeway_logo.png",
  url = "https://easewaymedicare.co.uk",
  type = "website",
}) => {
  const siteTitle = "Easeway Medicare Physiotherapy Clinic";
  const fullTitle = title.includes(siteTitle)
    ? title
    : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Easeway Medicare Physiotherapy" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#00CCB8" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
