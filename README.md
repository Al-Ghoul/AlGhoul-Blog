This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Read the following for API docs: [Authors API](/src/app/api/(authors)),
[Languages API](/src/app/api/(languages)),
[Main Topics API](/src/app/api/(mainTopics)), [Posts API](/src/app/api/(posts)),
[Tags API](/src/app/api/(tags)), [Topics API](/src/app/api/(topics)) &
[Projects API](/src/app/api/(projects)).

---

## Cache Tags

| Tag            |                 Link                  | Path                                                                            |
| :------------- | :-----------------------------------: | :------------------------------------------------------------------------------ |
| `postsData`    | Home Page Posts & Specific Posts View | app/[lang]/page.tsx, app/[lang]/post/[id]/page.tsx                              |
| `authorsPosts` |            Author's Posts             | app/[lang]/(author)/author/[author]/page.tsx                                    |
| `tagsPosts`    |              Tag's Posts              | app/[lang]/(tag)/tag/[tagId]/page.tsx                                           |
| `topicsPosts`  |             Topic's Posts             | app/[lang]/(topic)/topic/[topicId]/page.tsx                                     |
| `authors`      |                Authors                | app/[lang]/(author)/authors/page.tsx, app/[lang]/(dashboard)/dashboard/page.tsx |
| `tags`         |                 Tags                  | app/[lang]/(tag)/tags/page.tsx                                                  |
| `topics`       |                Topics                 | app/[lang]/(topic)/topics/page.tsx                                              |
| `languages`    |               Languages               | app/[lang]/(dashboard)/dashboard/page.tsx                                       |
| `maintopics`   |              Main Topics              | app/[lang]/(dashboard)/dashboard/page.tsx                                       |

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.
