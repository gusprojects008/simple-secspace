````markdown
# secspace

Um fórum autenticado simples, desenvolvido com foco em estudo e prática de conceitos modernos de desenvolvimento web.

## Visão geral

O **secspace** é um projeto educacional cujo objetivo é consolidar conhecimentos em arquitetura de software, containers e boas práticas de desenvolvimento. Ele não pretende ser um produto final, mas sim um ambiente de experimentação consciente e estruturada.

Ao longo do projeto, são aplicados conceitos fundamentais que aparecem com frequência em aplicações reais de médio e grande porte.

## Conceitos e tecnologias aplicadas

- Orquestração simples de containers com **Docker** e **docker-compose**
- Arquitetura **client-server**
- Arquitetura em camadas:
  - Controllers
  - Services (e adapters quando necessário)
  - Repositories
- Princípios e boas práticas de:
  - Clean Code
  - Clean Architecture
  - SOLID
- Autenticação via **OAuth2 (Google)**

## Melhorias futuras

- Implementar cache utilizando **Redis**
- Adotar orientação a eventos para reduzir polling agressivo de requisições `GET`
- Melhorar a estilização da interface

## Instalação e configuração

### Avisos importantes

Não execute `pnpm install` no host.

Caso esse comando (ou similar) seja executado por engano no host, lembre-se de remover todos os artefatos gerados, como:

- `node_modules`
- `.next`
- quaisquer outros diretórios criados na raiz do projeto (`secspace`)

Essas dependências devem ser instaladas **exclusivamente dentro dos containers**.

### Pré-requisitos

- Docker
- Docker Compose
- cloudflared

### Passo a passo

1. Inicie o daemon do Docker:

```bash
sudo dockerd
````

2. Exponha o serviço local usando o Cloudflare Tunnel:

```bash
sudo cloudflared --url http://127.0.0.1:80
```

3. Copie o link fornecido pelo `cloudflared` e configure o arquivo `.env`, substituindo os links padrão da API:

```env
GOOGLE_CALLBACK_URL=https://cloudflaredlinkexemplo.com/api/auth/login/google/callback
NEXT_PUBLIC_API_URL=https://cloudflaredlinkexemplo.com/api
```

4. Configure suas credenciais da API do Google:

```env
GOOGLE_CLIENT_ID=exemplo.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=SenhaSuperForte
```

5. No **Google Cloud Console**, registre os mesmos links definidos em:

* `NEXT_PUBLIC_API_URL`
* `GOOGLE_CALLBACK_URL`

Esses links devem ser adicionados aos campos de URLs autorizadas para permitir que a tela de OAuth2 do Google seja exibida corretamente após o redirecionamento.

Imagem de referência:

```text
./docs/images/console-api-google-configuracao.png
```

6. Suba a aplicação com Docker Compose:

```bash
sudo docker-compose up --build
```

## Observações finais

Este projeto prioriza clareza arquitetural e entendimento dos fluxos internos da aplicação, mesmo que isso resulte em soluções mais verbosas do que o necessário para um projeto pequeno. A ideia é estudar com consciência, não apenas “fazer funcionar”.

```
