export default function handler(req, res) {
	res
		.status(200)
		.json({ text: 'Hellooo', someMoreText: 'Changes made to main branch' });
}
