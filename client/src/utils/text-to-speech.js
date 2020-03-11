
//add the language iso
function textToSpeech(text,language_iso) {

	// get all voices that browser offers
	var available_voices = window.speechSynthesis.getVoices();

	// this will hold an english voice
	var voice = '';
	var f = false;
	console.log(language_iso)
	// find voice by language locale "en-US"
	// if not then select the first voice
	for(var i=0; i<available_voices.length; i++) {
		if(available_voices[i].lang.match(language_iso)) {
			voice = available_voices[i];
			f = true;
			break;
		}
		f = true
	}
	if((voice === '') && (f))
		voice = available_voices[0];
	// new SpeechSynthesisUtterance object
	var utter = new SpeechSynthesisUtterance();
	utter.rate = 0.9;
	utter.pitch = 0.5;
	utter.text = text;
	if (f)
		utter.voice = voice;

	// speak
	if (f)
		window.speechSynthesis.speak(utter);
}
export default textToSpeech;