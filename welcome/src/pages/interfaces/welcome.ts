export interface HomeProps {
  advantages: {
    title: string;
    text: string;
    image: string;
    alt: string;
  }[];
}

export interface Advantage {
  title: string;
  text: string;
  image: string;
  alt: string;
}

export interface WelcomeLayoutProps {
  advantages: Advantage[];
}