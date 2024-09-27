document.addEventListener('DOMContentLoaded', function () {
	const startBtn = document.getElementById('startBtn');
	const stopBtn = document.getElementById('stopBtn');
	const status = document.getElementById('status');
	const transcriptDiv = document.getElementById('transcript');

	startBtn.addEventListener('click', function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { action: "startTranscription" }, function (response) {
				status.textContent = response.status;
			});
		});
	});

	stopBtn.addEventListener('click', function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { action: "stopTranscription" }, function (response) {
				status.textContent = response.status;
				// Fetch and display the latest transcript
				chrome.storage.local.get(['lastTranscript'], function (result) {
					transcriptDiv.textContent = result.lastTranscript || 'No transcript available';
				});
			});
		});
	});

	// Display the last saved transcript when popup opens
	chrome.storage.local.get(['lastTranscript'], function (result) {
		transcriptDiv.textContent = result.lastTranscript || 'No transcript available';
	});
});