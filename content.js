// Function to check if we're in a Google Meet
function isInGoogleMeet() {
	return window.location.hostname === 'meet.google.com';
}

let transcription = '';
let isTranscribing = false;

// Function to start the transcription
function startTranscription() {
	if (isTranscribing) return;

	isTranscribing = true;
	transcription = '';

	// Create a new SpeechRecognition object
	const recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;

	recognition.onresult = function (event) {
		for (let i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				transcription += event.results[i][0].transcript + ' ';
			}
		}
	};

	recognition.onerror = function (event) {
		console.error('Speech recognition error:', event.error);
		stopTranscription();
	};

	recognition.onend = function () {
		if (isTranscribing) {
			recognition.start();
		}
	};

	recognition.start();
	console.log('Transcription started');
	chrome.runtime.sendMessage({ action: 'transcriptionStarted' });
}

// Function to stop the transcription
function stopTranscription() {
	if (!isTranscribing) return;

	isTranscribing = false;
	console.log('Transcription stopped');
	chrome.runtime.sendMessage({ action: 'transcriptionStopped', transcript: transcription });
}

// Function to add UI elements
function addUIElements() {
	const controlsDiv = document.createElement('div');
	controlsDiv.id = 'meetscribe-controls';
	controlsDiv.style.position = 'fixed';
	controlsDiv.style.top = '10px';
	controlsDiv.style.right = '10px';
	controlsDiv.style.zIndex = '9999';

	const startButton = document.createElement('button');
	startButton.textContent = 'Start Transcription';
	startButton.onclick = startTranscription;

	const stopButton = document.createElement('button');
	stopButton.textContent = 'Stop Transcription';
	stopButton.onclick = stopTranscription;

	controlsDiv.appendChild(startButton);
	controlsDiv.appendChild(stopButton);
	document.body.appendChild(controlsDiv);
}

// Main function to run when the content script is injected
function main() {
	if (isInGoogleMeet()) {
		console.log('MeetScribe AI is ready');
		addUIElements();
	}
}

// Run the main function
main();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'startTranscription') {
		startTranscription();
		sendResponse({ status: 'Transcription started' });
	} else if (request.action === 'stopTranscription') {
		stopTranscription();
		sendResponse({ status: 'Transcription stopped' });
	}
	return true;
});