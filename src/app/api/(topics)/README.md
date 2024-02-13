# Topics RESTful API

Topics is a collection resource that's a translated version of main topics
exposed at `/api/topics/`, However this
[URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) could take some
[searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams),
the params are represented in the following table:

| Search Param | Description                                                                                                                                                                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| langCode     | Specifies in which language topics should be queried and returned                                                                                                                                                                                              |
| count        | Specifies how many topics should be queried and returned                                                                                                                                                                                                       |
| orderBy      | Specifies how to sort the queried resources                                                                                                                                                                                                                    |
| desc         | By default there's no sorting that'd happen if you omitted **orderBy** param, however if you provided an **orderBy** key the default is **ascendant** sorting, hence no **asc** search parameter and providing **desc** would result in **descendant** sorting |
| include      | Specifies what to include with a _topic_ resource, should be one of the following: posts or language                                                                                                                                                           |

---

Single Topic resources exposed at `api/topics/{topicId}` where `topicId` is an
ID that identifies a single topic, the following table shows the
[searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams)
the [URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) can take: |
Search Param | Description| | ------------- | ------------- | | include |
Specifies what to include with a _topic_ resource, should be one of the
following: language, topic | langId | This is similar to en or ar but here an ID
is expected which is either 1 or 2 & this determines in which language the topic
should queried and returned

---

Each topic has a sub posts collection exposed at `api/topic/{topicId}/posts`
where `topicId` is an ID that identifies a single topic, However this
[URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) could take some
[searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams),
the params are represented in the following table:

| Search Param | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| langCode     | Specifies in which language posts should be queried and returned |
