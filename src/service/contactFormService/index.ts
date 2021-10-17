import axios from "axios";

const mailRecipient = "649c6f8c517f62079705343e611ada3c";

export function submitFormRequest(title: string, request: string): Promise<any> {
	return new Promise<any>((resolve, reject) => {
		axios.post(`https://formsubmit.co/ajax/${mailRecipient}`, {
			name: title,
			message: request
		})
			.then(response => resolve(response))
			.catch(error => reject(error));
	})
}