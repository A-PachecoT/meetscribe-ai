let currentTranscript = '';

// Listen for installation or update of the extension
chrome.runtime.onInstalled.addListener(() => {
	console.log('MeetScribe AI installed or updated');
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'transcriptionStarted') {
		console.log('Transcription started');
		currentTranscript = '';
	} else if (request.action === 'transcriptionStopped') {
		console.log('Transcription stopped');
		currentTranscript = request.transcript;
		// Save the transcript to storage
		chrome.storage.local.set({ lastTranscript: currentTranscript }, () => {
			console.log('Transcript saved to storage');
		});
	}
	return true; // Indicates that the response will be sent asynchronously
});