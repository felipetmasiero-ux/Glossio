# Backup e Restore — PostgreSQL (Render)

## ⚠️ Importante sobre o plano free do Render

Bancos Postgres gratuitos no Render **expiram após 30 dias** e não têm backup automático. Isso é adequado para desenvolver/testar, mas é um risco real de perda de dados assim que existirem usuários reais. Antes de divulgar a URL de produção:

- Faça upgrade do banco (`glossio-db`) para um plano pago no dashboard do Render, **ou**
- Configure backups manuais recorrentes (Passo abaixo) enquanto estiver no plano free, com disciplina de rodar isso com frequência.

## Backup automático (plano pago)

Nos planos pagos, o Render já faz backups diários automaticamente, com retenção que varia por plano (confira o período exato no dashboard do banco → aba **Backups**, já que a política pode mudar). Nenhuma configuração adicional é necessária — só garantir que o plano contratado inclui isso.

## Backup manual (`pg_dump`)

Útil como complemento ao backup automático, ou como único backup se ainda estiver no plano free.

1. No dashboard do Render, abra `glossio-db` → copie a **External Connection String** (não a interna — essa só funciona de dentro da rede do Render).
2. Rode localmente (precisa do `pg_dump` do PostgreSQL 16.x instalado):
   ```bash
   pg_dump "postgresql://usuario:senha@host:5432/banco" \
     --format=custom \
     --file="glossio-backup-$(date +%Y%m%d-%H%M%S).dump"
   ```
3. Guarde o arquivo `.dump` em um lugar durável (um bucket S3/similar, ou ao menos fora da própria máquina) — o objetivo é sobreviver a um incidente que afete tanto o Render quanto a sua máquina local.

Um cron/agendador (GitHub Actions com um secret da connection string, por exemplo) pode automatizar esse passo com uma frequência definida, se optar por não pagar o plano com backup automático.

## Restore

**Restaurar por cima de um banco que já tem dados apaga o que estiver lá primeiro** - confirme que é realmente isso que você quer antes de rodar.

```bash
pg_restore \
  --dbname="postgresql://usuario:senha@host:5432/banco" \
  --clean --if-exists \
  glossio-backup-20260803-120000.dump
```

- `--clean --if-exists`: dropa as tabelas existentes antes de recriá-las a partir do backup (evita conflitos de "já existe"), sem falhar se algo não existir ainda.
- Depois de restaurar, rode `npx prisma migrate deploy` (dentro de `backend/`) para garantir que o schema do banco restaurado está alinhado com as migrations mais recentes do código em produção — um backup mais antigo pode não ter uma migration que já foi aplicada depois.

## Testando o processo

Um backup nunca testado não é um backup confiável. Periodicamente:

1. Rode um `pg_dump` como acima.
2. Restaure em um banco Postgres **local** (não em produção) - `createdb glossio_restore_test && pg_restore --dbname=glossio_restore_test ...`.
3. Confirme que os dados batem com o esperado (`psql glossio_restore_test -c "SELECT count(*) FROM \"User\";"`, por exemplo).

Isso garante que, no dia que um restore for realmente necessário, o processo documentado aqui de fato funciona.
