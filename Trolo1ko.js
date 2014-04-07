/**
 * Trolo1ko
 * @author Martin DEQUATREMARE
 * @link https://github.com/MD4
 */
window.Trolo1ko = function (p) {
	this.asc = ['A0', 'A0#', 'B0'];
	for (var i = 1; i <= 7; i++ )
		this.asc = this.asc.concat(['C'+i, 'C'+i+'#', 'D'+i, 'D'+i+'#', 'E'+i, 'F'+i, 'F'+i+'#', 'G'+i, 'G'+i+'#', 'A'+i, 'A'+i+'#', 'B'+i]);
	this.asc.push('C8');
	this.p = p;
	this.a = new (window.AudioContext || window.webkitAudioContext)();
	console.log(this.a.createGainNode, this.a.createGain);
	this.gn = this.a.createGain();
	this.gn.connect(this.a.destination);
	this.gn.gain.value = 0.5;
};
window.Trolo1ko.prototype.play = function (t, v, i) {
	i = i || 0;
	if (i < this.p.length) {
		if (i > 0)
			this.o.stop(0);
		this.o = this.a.createOscillator();
		this.o.type = v || 2;
		this.o.connect(this.gn);
		this.o.frequency.value = Math.pow(2, ((this.asc.indexOf(this.p[i][0]) - 48) / 12)) * 440;
		this.o.start(0);
		var s = this;
		setTimeout(function () {
			s.play(t, v, ++i);
		}, (60 / (+t * Math.pow(2, this.p[i][1] - 2))) * 1000);
	} else {
		this.o.stop(0);
	}
};