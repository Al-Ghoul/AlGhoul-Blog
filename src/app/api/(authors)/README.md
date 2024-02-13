# Authors RESTful API

Authors is a collection resource exposed at `/api/authors/`, However this
[URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) could take some
[searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams),
the params are represented in the following table:

| Search Param | Description                                                                                                                                                                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| langCode     | Specifies in which language authors should be queried and returned                                                                                                                                                                                             |
| count        | Specifies how many authors should be queried and returned                                                                                                                                                                                                      |
| orderBy      | Specifies how to sort the queried resources                                                                                                                                                                                                                    |
| desc         | By default there's no sorting that'd happen if you omitted **orderBy** param, however if you provided an **orderBy** key the default is **ascendant** sorting, hence no **asc** search parameter and providing **desc** would result in **descendant** sorting |
| include      | Specifies what to include with an _author_ resource, should be one of the following: posts or language                                                                                                                                                         |

---

Each author has a sub posts collection exposed at
`api/authors/{authorName}/posts` where `authorName` is an author's name that
identifies a single author, it doesn't accept any searchParams, and it returns
the queried author plus his/her posts.
