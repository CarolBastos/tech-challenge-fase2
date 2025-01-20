import WelcomeLayout from "@/components/Layout/WelcomeLayout";
import HomeProps from "@/interfaces";
import { GetStaticProps } from "next";

const HomePage = ({ advantages }: HomeProps) => {
  if (!Array.isArray(advantages)) {
    return <div>Erro ao carregar vantagens. Tente novamente mais tarde.</div>;
  }

  return (
    <main className="w-full bg-tertiary-400 max-[1023px]:pb-9">
      <WelcomeLayout advantages={advantages} />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const advantages = [
    {
      title: "Conta e cartão gratuitos",
      text: "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.",
      image: "/images/icone-presente.svg",
      alt: "Ícone de presente",
    },
    {
      title: "Saques sem custo",
      text: "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
      image: "/images/icone-saque.svg",
      alt: "Ícone de saque bancário",
    },
    {
      title: "Programa de pontos",
      text: "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
      image: "/images/icone-pontos.svg",
      alt: "Ícone de estrela, representando pontuação",
    },
    {
      title: "Seguro Dispositivos",
      text: "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
      image: "/images/icone-dispositivos.svg",
      alt: "Ícone de dispositivos tecnológicos",
    },
  ];

  if (!Array.isArray(advantages) || advantages.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      advantages,
    },
  };
};

export default HomePage;