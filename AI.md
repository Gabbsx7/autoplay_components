3. No painel direito → **Props** → ligue `list` a `projects.data` ou qualquer array.
4. Opcionalmente ajuste `gap` (px) para controlar a sobreposição vertical.
5. Troque a navegação no método `openProject()` para corresponder ao slug/rota da sua página de detalhe.

**Estrutura esperada do item da lista**
```json
{
  "id": "123",
  "title": "Footlocker CGI production",
  "description": "Currently in production…",
  "status": "DRAFT",           // ou IN PROGRESS, PROPOSAL
  "avatars": [
    "https://cdn.example.com/ava1.jpg",
    "https://cdn.example.com/ava2.jpg"
  ]
}
```