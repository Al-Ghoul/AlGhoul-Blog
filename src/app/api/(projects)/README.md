# Projects RESTful API

Projects is a collection resource exposed at `/api/projects` However this
[URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) could take some
[searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams),
the params are represented in the following table:

| Search Param | Description                                                       |
| ------------ | ----------------------------------------------------------------- |
| langCode     | Specifies in which language posts should be queried and returned  |
| count        | Specifies how many posts should be queried and returned           |
| orderBy      | Specifies the key to how to sort the queried resources            |
| sortBy       | Specifies how to sort queried resources (ascendant or descendant) |
| cursor       | An id to start querying after or before it (depends on _dir_)     |
| dir          | A direction to specify whether to query after or before _cursor_  |
