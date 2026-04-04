-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Secoes" (
    "id_secao" SERIAL NOT NULL,
    "nome_secao" TEXT NOT NULL,

    CONSTRAINT "Secoes_pkey" PRIMARY KEY ("id_secao")
);

-- CreateTable
CREATE TABLE "Modulos" (
    "id_modulo" SERIAL NOT NULL,
    "nome_modulo" TEXT NOT NULL,
    "id_secao" INTEGER NOT NULL,

    CONSTRAINT "Modulos_pkey" PRIMARY KEY ("id_modulo")
);

-- CreateTable
CREATE TABLE "Submodulos" (
    "id_submodulo" SERIAL NOT NULL,
    "nome_submodulo" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "id_modulo" INTEGER NOT NULL,

    CONSTRAINT "Submodulos_pkey" PRIMARY KEY ("id_submodulo")
);

-- CreateTable
CREATE TABLE "Aula" (
    "id_aula" SERIAL NOT NULL,
    "id_submodulo" INTEGER NOT NULL,
    "url_video" TEXT,
    "url_audio" TEXT,
    "url_imagem" TEXT,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id_aula")
);

-- CreateTable
CREATE TABLE "Texto" (
    "id_texto" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "corpo" TEXT NOT NULL,
    "referencias" TEXT,
    "id_aula" INTEGER NOT NULL,

    CONSTRAINT "Texto_pkey" PRIMARY KEY ("id_texto")
);

-- CreateTable
CREATE TABLE "Quiz_aula" (
    "id" SERIAL NOT NULL,
    "id_aula" INTEGER NOT NULL,

    CONSTRAINT "Quiz_aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perguntas" (
    "id_pergunta" SERIAL NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "enunciado" TEXT NOT NULL,
    "id_quiz" INTEGER,
    "id_aula" INTEGER,

    CONSTRAINT "Perguntas_pkey" PRIMARY KEY ("id_pergunta")
);

-- CreateTable
CREATE TABLE "Alternativas" (
    "id_alternativa" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "certa" BOOLEAN NOT NULL,
    "explicacao" TEXT,
    "id_pergunta" INTEGER NOT NULL,

    CONSTRAINT "Alternativas_pkey" PRIMARY KEY ("id_alternativa")
);

-- CreateTable
CREATE TABLE "Temas" (
    "id_tema" SERIAL NOT NULL,
    "tema" TEXT NOT NULL,

    CONSTRAINT "Temas_pkey" PRIMARY KEY ("id_tema")
);

-- CreateTable
CREATE TABLE "Pergunta_tema" (
    "id_pergunta" INTEGER NOT NULL,
    "id_tema" INTEGER NOT NULL,

    CONSTRAINT "Pergunta_tema_pkey" PRIMARY KEY ("id_pergunta","id_tema")
);

-- CreateTable
CREATE TABLE "Progresso_Usuario" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_aula" INTEGER NOT NULL,
    "porcentagem" DOUBLE PRECISION NOT NULL,
    "concluido" BOOLEAN NOT NULL,
    "ultima_interacao" TIMESTAMP(3),
    "data_conclusao" TIMESTAMP(3),

    CONSTRAINT "Progresso_Usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Modulos" ADD CONSTRAINT "Modulos_id_secao_fkey" FOREIGN KEY ("id_secao") REFERENCES "Secoes"("id_secao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submodulos" ADD CONSTRAINT "Submodulos_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "Modulos"("id_modulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_id_submodulo_fkey" FOREIGN KEY ("id_submodulo") REFERENCES "Submodulos"("id_submodulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Texto" ADD CONSTRAINT "Texto_id_aula_fkey" FOREIGN KEY ("id_aula") REFERENCES "Aula"("id_aula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_aula" ADD CONSTRAINT "Quiz_aula_id_aula_fkey" FOREIGN KEY ("id_aula") REFERENCES "Aula"("id_aula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perguntas" ADD CONSTRAINT "Perguntas_id_quiz_fkey" FOREIGN KEY ("id_quiz") REFERENCES "Quiz_aula"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perguntas" ADD CONSTRAINT "Perguntas_id_aula_fkey" FOREIGN KEY ("id_aula") REFERENCES "Aula"("id_aula") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alternativas" ADD CONSTRAINT "Alternativas_id_pergunta_fkey" FOREIGN KEY ("id_pergunta") REFERENCES "Perguntas"("id_pergunta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pergunta_tema" ADD CONSTRAINT "Pergunta_tema_id_pergunta_fkey" FOREIGN KEY ("id_pergunta") REFERENCES "Perguntas"("id_pergunta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pergunta_tema" ADD CONSTRAINT "Pergunta_tema_id_tema_fkey" FOREIGN KEY ("id_tema") REFERENCES "Temas"("id_tema") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progresso_Usuario" ADD CONSTRAINT "Progresso_Usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progresso_Usuario" ADD CONSTRAINT "Progresso_Usuario_id_aula_fkey" FOREIGN KEY ("id_aula") REFERENCES "Aula"("id_aula") ON DELETE RESTRICT ON UPDATE CASCADE;
