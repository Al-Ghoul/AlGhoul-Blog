# Tags RESTful API

Tags is a collection resource exposed at `/api/tags/`, However this [URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) could take some [searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams), the params are represented in the following table:

| Search Param  | Description|
| ------------- | ------------- |
| langCode | Specifies in which language tags should be queried and returned  |
| count | Specifies how many tags should be queried and returned  |
| orderBy  | Specifies how to sort the queried resources  |
| desc  | By default there's no sorting that'd happen if you omitted **orderBy** param, however if you provided an **orderBy** key the default is **ascendant** sorting, hence no **asc** search parameter and providing **desc** would result in **descendant** sorting|
| include | Specifies what to include with a *tag* resource, should be one of the following: posts or language 
___

Each tag has a sub posts collection exposed at `api/tags/{tagId}/posts` where `tagId` is an ID that identifies a single tag, However this [URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) could take some [searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams), the params are represented in the following table:

| Search Param  | Description|
| ------------- | ------------- |
| langCode | Specifies in which language posts should be queried and returned  |
