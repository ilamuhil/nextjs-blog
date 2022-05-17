import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export const allPostIds = () => {
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames.map(fileName => ({
		params: { id: fileName.replace(/\.md$/, '') },
	}));
};

export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	console.log(
		'🚀 ~ file: posts.js ~ line 10 ~ getSortedPostsData ~ fileNames',
		fileNames
	);
	const allPostsData = fileNames.map(fileName => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '');

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		console.log(
			'🚀 ~ file: posts.js ~ line 17 ~ allPostsData ~ fullPath ',
			fullPath
		);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		console.log(
			'🚀 ~ file: posts.js ~ line 19 ~ allPostsData ~ fileContents ',
			fileContents
		);

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);
		console.log(
			'🚀 ~ file: posts.js ~ line 23 ~ allPostsData ~ matterResult',
			matterResult
		);

		// Combine the data with the id
		return {
			id,
			...matterResult.data,
		};
	});
	// Sort posts by date
	return allPostsData.sort(({ date: a }, { date: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
}

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	// Use gray-matter to parse the post data
	const matterResult = matter(fileContents);
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	console.log(
		'🚀 ~ file: posts.js ~ line 69 ~ getPostData ~ processedContent',
		processedContent
	);
	const contentHtml = processedContent.toString();
	console.log(
		'🚀 ~ file: posts.js ~ line 73 ~ getPostData ~ contentHtml',
		contentHtml
	);

	// Combine the data with the id
	return {
		id,
		contentHtml,
		...matterResult.data,
	};
}
