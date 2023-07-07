import type { Translation } from '../i18n-types'

const en = {
	siteTitle: 'AlGhoul',
	copyRightNotice: 'AlGhoul © {year}',
	WELCOMING: [
		"Hi there, and welcome to my blog! I'm a developer who's passionate about sharing my knowledge with others. I hope you'll find my posts helpful and inspiring.",
		"Hello! I'm a developer, and this is my blog. I write about the things I'm learning, the things I'm building, and the things I'm thinking about. I hope you'll find it interesting.",
	],
	MY_BLOG: 'My Blog',
	BLOG_ENTRY: 'There\'s plenty of resources for lots of learning materials out there, it is our privilege that we exist in this era, be inspired and use it wisely.',
	HOME_PAGE: 'Home',
	ABOUT_US: 'About us',
	TAGS_PAGE: 'Tags',
	AUTHORS_PAGE: 'Authors',
	TOPICS_PAGE: 'Topics',
	READ_MORE: 'Read more',
	HOURS_AGO: '{hours} {{hour|hours}} ago.',
	AUTHOR_POSTS_PAGE: '{name}\'s Posts',
	ERROR_404: "Error 404",
	ERROR_404_PAGE_NOT_FOUND: 'We could not find this page',
	AUTHOR_NOT_OR_POSTS_FOUND: 'We could not find this author or he does not have any posts',
	AUTHORS_NOT_FOUND: 'We could not find any author',
	TAG_NO_POSTS_FOUND: 'We could not find any posts associated with this tag',
	TAGS_NOT_FOUND: 'We could not find any tag',
	POST_NOT_FOUND: 'We could not find this post',
	TOPIC_OR_POSTS_NOT_FOUND: 'We could not find this topic or it doesn\'t have any associated posts',
	TOPICS_NOT_FOUND: 'We could not find any topic'
} satisfies Translation

export default en
