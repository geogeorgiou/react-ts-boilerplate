import axios from "axios";

const mailRecipient = "9dd0d59ac9765c2c2d696e7ca495f57a";

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