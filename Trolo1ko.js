/**
 * Trolo1ko
 * @author Martin DEQUATREMARE
 * @link https://github.com/MD4
 */
var z = window.Trolo1ko = function (p) {
	var s = this;
	s.x = ['A0', 'A0#', 'B0'];
	for (var i = 1; i <= 7; i++)
		s.x = s.x.concat("Cx Cx# Dx Dx# Ex Fx Fx# Gx Gx# Ax Ax# Bx".replace(/x/g, i).split(' '));
	s.x.push('C8');
	s.p = p;
	s.a = new (window.AudioContext || window.webkitAudioContext)();
	s.g = s.a.createGain();
	s.g.connect(s.a.destination);
	s.g.gain.value = 0.5;
};
z.prototype.play = function (t, v, i) {
	var s = this,
		w = Math.pow;
	i = i || 0;
	if (i >= s.p.length)
		return s.o.stop(0);
	if (i > 0)
		s.o.stop(0);
	s.o = s.a.createOscillator();
	s.o.type = v || 2;
	s.o.connect(s.g);
	s.o.frequency.value = w(2, ((s.x.indexOf(s.p[i][0]) - 48) / 12)) * 440;
	s.o.start(0);
	setTimeout(function () {
		s.play(t, v, ++i);
	}, (60 / (+t * w(2, s.p[i][1] - 2))) * 1000);
};