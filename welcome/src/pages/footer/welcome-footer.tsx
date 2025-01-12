import Image from "next/image";

export default function WelcomeFooter() {
  return (
    <footer className="w-full bg-black font-inter">
      <div className="max-w-lg flex gap-8 mx-auto py-6 items-center text-sm text-white flex-col md:flex-row md:max-w-md py-6 lg:flex-row lg:max-w-lg lg:px-6 lg:py-10">
        <div className="flex-1">
          <p className="mb-4 font-bold">Serviços</p>
          <ul className="flex flex-col gap-4">
            <li><a href="/welcome">Conta corrente</a></li>
            <li><a href="/welcome">Conta PJ</a></li>
            <li><a href="/welcome">Cartão de crédito</a></li>
          </ul>
        </div>
        <div className="flex-1">
          <p className="mb-4 font-bold">Contato</p>
          <ul className="flex flex-col gap-4">
            <li>0800 004 250 08</li>
            <li>meajuda@bytebank.com.br</li>
            <li><a href="/welcome">ouvidoria@bytebank.com.br</a></li>
          </ul>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <p className="font-bold">Desenvolvido por Alura</p>
          <a href="/welcome">
            <Image
              src="/images/byte-bank-white-logo.svg"
              alt="ByteBank logo"
              width={145.69}
              height={32}
            />
          </a>
          <div className="flex gap-6">
            <a href="/welcome">
              <Image
                src="/images/instagram-logo.svg"
                alt="Instagram"
                width={32}
                height={32}
              />
            </a>
            <a href="/welcome">
              <Image
                src="/images/whatsapp-logo.svg"
                alt="Whatsapp"
                width={32}
                height={32}
              />
            </a>
            <a href="/welcome">
              <Image
                src="/images/youtube-logo.svg"
                alt="Youtube"
                width={32}
                height={32}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
