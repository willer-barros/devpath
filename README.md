# DevRoute 🚀

> Seu roadmap de estudos para programação — do zero ao deploy.

O **DevRoute** é uma plataforma educacional criada por professores do SENAI para ajudar alunos iniciantes a encontrar o melhor caminho no mundo da programação. Reúne cursos, artigos e tutoriais gratuitos organizados por trilhas, com glossário interativo para tirar dúvidas básicas de terminologia.

---

## 🎯 Sobre o projeto

O DevRoute nasceu da necessidade de centralizar recursos de qualidade para alunos que estão começando. Em vez de perder tempo procurando por onde começar, o aluno encontra tudo organizado por trilha, com indicação de nível e idioma.

**Funcionalidades:**
- Recursos organizados em trilhas (Fundamentos, Web, Back-end, Ferramentas)
- Filtro por trilha
- Marcação de progresso salva no navegador
- Glossário interativo para dúvidas básicas de terminologia
- Painel exclusivo para professores adicionarem novos recursos e termos
- Dark mode automático
- Responsivo para mobile

---

## 👨‍🎓 Para alunos

### Como usar o roadmap

1. **Acesse** [devroute.vercel.app](https://devroute.vercel.app)
2. **Escolha sua trilha** — use os filtros no topo para navegar entre Fundamentos, Web, Back-end e Ferramentas
3. **Siga a ordem** — os recursos estão organizados por nível (iniciante → avançado), representado pelos pontos em cada card
4. **Marque seu progresso** — clique no botão `○` em cada card para marcar como concluído. Seu progresso fica salvo no navegador
5. **Tire dúvidas** — clique no botão `?` verde no canto inferior direito para abrir o glossário e buscar termos que você não conhece

### Dicas para aproveitar melhor

- Não pule etapas — os fundamentos são a base de tudo
- Os recursos marcados como `EN` estão em inglês. Se tiver dificuldade, use o Google Tradutor ou busque o conteúdo em português primeiro
- Os pontos coloridos em cada card indicam o nível: 1 ponto = iniciante, 2 = intermediário, 3 = avançado
- Se tiver dúvidas sobre algum termo técnico, use o glossário antes de pesquisar no Google

---

## 👨‍🏫 Para professores

### Como criar sua conta

O acesso de professor é restrito. Para criar uma conta você precisa de uma **chave secreta** fornecida pelo administrador.

Entre em contato pelo e-mail **willerbarros137@gmail.com** solicitando acesso. Informe seu nome e instituição de ensino. Após aprovação, você receberá a chave para criar sua conta.

### Como adicionar um novo recurso

1. Faça login com sua conta de professor
2. Na página inicial, clique no botão `+` verde que aparece ao lado dos filtros
3. Preencha o formulário com os dados do recurso:
   - **Trilha** — selecione uma existente ou crie uma nova
   - **Fonte** — nome da plataforma (ex: freeCodeCamp, Harvard, Rocketseat)
   - **Título** — nome do curso ou recurso
   - **Descrição** — explique brevemente o que o aluno vai aprender
   - **Link** — URL direta para o recurso
   - **Tipo** — Gratuito ou Pago
   - **Nível** — 1 (iniciante), 2 (intermediário) ou 3 (avançado)
   - **Idioma** — PT ou EN
4. Clique em **Salvar recurso**
5. O recurso aparece imediatamente na plataforma para todos os alunos
6. Você receberá um e-mail de confirmação após salvar

### Como gerenciar o glossário

1. Faça login com sua conta de professor
2. Clique em **glossário** no menu superior direito
3. Adicione novos termos preenchendo o termo e a definição em linguagem simples
4. Os termos ficam disponíveis imediatamente para todos os alunos no botão `?`

### Boas práticas para descrições

- Escreva como se estivesse explicando para um iniciante absoluto
- Seja direto e objetivo — máximo 2 linhas
- Mencione o que o aluno vai aprender ou construir ao concluir

---

## 🛠️ Stack técnica

- **Frontend:** Next.js 15 + TypeScript
- **Estilo:** CSS Modules
- **Banco de dados:** Supabase (PostgreSQL)
- **Autenticação:** Supabase Auth
- **Email:** Resend
- **Deploy:** Vercel

---

## 🤝 Contribuindo

Professores e Alunos podem contribuir diretamente pela plataforma. Para contribuições técnicas ao código, abra uma issue ou PR no repositório.

---

## 📬 Contato

Dúvidas, sugestões ou solicitação de acesso de professor:

**willerbarros137@gmail.com**

---

## 📄 Licença

MIT