import axios from "axios";

const mailRecipient = "9dd0d59ac9765c2c2d696e7ca495f57a";

export function submitFormRequest(title: string, request: string) {
	axios.post(`https://formsubmit.co/ajax/${mailRecipient}`, {
		name: title,
		message: request
	})
		.then(response => console.log(response))
		.catch(error => console.log(error));
}