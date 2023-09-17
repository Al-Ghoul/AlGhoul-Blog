# Posts RESTful API

Posts is a collection resource exposed at `/api/posts/`, However this [URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) could take some [searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams), the params are represented in the following table:

| Search Param  | Description|
| ------------- | ------------- |
| langCode | Specifies in which language posts should be queried and returned  |
| count | Specifies how many posts should be queried and returned  |
| orderBy  | Specifies how to sort the queried resources  |
| desc  | By default there's no sorting that'd happen if you omitted **orderBy** param, however if you provided an **orderBy** key the default is **ascendant** sorting, hence no **asc** search parameter and providing **desc** would result in **descendant** sorting|
| include | Specifies what to include with a *post* resource, should be one of the following: author, language, tags or topic
___

Single Post resources exposed at `api/posts/{postId}` where `postId` is an ID that identifies a single post, the following table shows the [searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams) the [URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) can take:
| Search Param  | Description|
| ------------- | ------------- |
| include | Specifies what to include with a *post* resource, should be one of the following: author, language, tags or topic