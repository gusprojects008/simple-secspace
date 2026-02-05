import Image from 'next/image';
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className='container'>
      <main className={`content ${styles.content}`}>
        <header className={styles.hdr}>
          <div>
            <h1 className={styles.title}>Metodologias utilizadas no pentesting</h1>
            <p className={styles.subtitle}>Explorando as fronteiras da segurança ofensiva.</p>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.lockimg}
              src="/images/lock.png"
              alt="Security lock"
              priority
              width={400}
              height={400}
            />
          </div>
        </header>
        <section className={styles.content}>
          <h2>Análise de comportamento em testes lógicos e técnicos</h2>
          <h3>Análise de vulnerabilidades, coleta de informações, versões de softwares e sistemas, varredura completa</h3>
          <p>
              Sistemas, APIs, softwares, servidores e aplicações web estão, na maioria das vezes, conectados à internet — o que os torna alvos potenciais. Esses sistemas geralmente estão rodando em computadores que possuem falhas e vulnerabilidades. A internet, por sua vez, é composta por servidores, IPs, conexões, e tudo isso está fundamentado em linguagens de programação. E onde há sistemas, há brechas que podem ser exploradas.
          </p>
          <p>
              A primeira etapa consiste em testar as funcionalidades do sistema, entender como ele foi feito e como se comporta diante de determinadas ações. Em seguida, realiza-se uma verificação de portas abertas nos servidores <strong>(pois eles estão conectados em alguma rede e constantemente trocando informações)</strong>. Também é importante testar os sistemas de segurança, como portais de login, SSH, FTP, entre outros.
          </p>
          <p>
              Um aspecto interessante da coleta de informações é que, em alguns casos, foram encontradas informações sensíveis sobre empresas em lixos próximos ao local, como <b><q>SSDs, HDs, computadores usados ou celulares descartados</q></b>. Essa etapa é extremamente importante — e, muitas vezes, a mais complexa.
          </p>

          <h2>Ataques</h2>
          <p>
              Este é o momento em que você utiliza as informações coletadas e inicia o teste de penetração, dependendo do contrato realizado com a pessoa ou empresa, o anonimato pode ser necessário para simular ataques reais realizados por invasores.
          </p>

          <h2>Controle e Escalonamento de Privilégios:</h2>
          <h3>Explorando o sistema:</h3>
          <p>
              Nesta fase, o objetivo é obter controle total ou extrair informações específicas do sistema. Isso pode ser feito explorando vulnerabilidades em programas instalados ou no sistema responsável por armazenar os arquivos, entre outras abordagens.
          </p>

          <h2>Limpeza de Registros</h2>
          <p>
            Os invasores normalmente tentam obter acesso aos logs para apagá-los ou modificá-los. Em alguns casos (como em APTs), podem ainda implementar um backdoors para acessos ou explorações futuras, mantendo o controle sobre o sistema sem que a vítima perceba.
          </p>
        </section>
      </main>
    </div>
  );
};
