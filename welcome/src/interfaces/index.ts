interface Advantage {
  title: string;
  text: string;
  image: string;
  alt: string;
}

export default interface HomeProps {
  advantages: Advantage[];
}
