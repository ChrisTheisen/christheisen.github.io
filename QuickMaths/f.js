"use strict";

const F = document.getElementById('fireworks');
const ctx = F.getContext("2d", {alpha: false});
F.addEventListener('click', (e) => {A.focus();});

const speed = 10;
const G = -.05;
const twoPI = Math.PI*2;
const fw = [];
let W = 10;
let H = 10;
let AF = 0;
let encourageTimer = 0;
let encouragementHue = 0;
let bgColor = '#87CEEB'; // Default to robin egg blue

// Fragment pool for reuse
const FRAGMENT_POOL_SIZE = 1000;
const fragmentPool = [];
let fragmentPoolIndex = 0;

// Pre-calculate common values
const colorCache = new Map();
function getColor(hue, sat, alpha) {
	const key = `${hue},${sat},${alpha}`;
	if (!colorCache.has(key)) {
		colorCache.set(key, `hsl(${hue},${sat}%,50%,${alpha}%)`);
	}
	return colorCache.get(key);
}

class Point {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	plus(addend) {
		return new Point(
			this.x + (addend?.x || 0),
			this.y + (addend?.y || 0)
		);
	}

	scale(mult) {
		return new Point(this.x * mult, this.y * mult);
	}
}

function setBgColor(color) {
	bgColor = color;
}

// Initialize fragment pool
function createFragment() {
	const fragment = {
		location: new Point(),
		velocity: new Point(),
		trail: new Array(5).fill(null).map(() => new Point()),
		trailIndex: 0,
		hue: 0,
		sat: 50,
		age: 0,
		reset(x, y, hue) {
			const v = Math.random() * twoPI;
			const px = Math.random() * 5;
			const py = Math.random() * 5;
			
			this.location.x = x;
			this.location.y = y;
			this.velocity.x = Math.cos(v) * px * 4;
			this.velocity.y = Math.sin(v) * py * 4;
			this.hue = hue + (Math.random() * 100 - 50) | 0;
			this.age = 75 + Math.random() * 50;
			this.trailIndex = 0;
			
			// Reset trail points
			for (let i = 0; i < 5; i++) {
				this.trail[i].x = x;
				this.trail[i].y = y;
			}
		}
	};
	return fragment;
}

// Pre-populate fragment pool
for (let i = 0; i < FRAGMENT_POOL_SIZE; i++) {
	fragmentPool.push(createFragment());
}

function getFragment(x, y, hue) {
	const fragment = fragmentPool[fragmentPoolIndex];
	fragmentPoolIndex = (fragmentPoolIndex + 1) % FRAGMENT_POOL_SIZE;
	fragment.reset(x, y, hue);
	return fragment;
}

class Firework {
	constructor() {
		this.exploded = false;
		this.location = new Point(W/2, H);
		const x = Math.random() * W;
		const y = Math.random() * (H/2);
		this.target = new Point(x, y);
		
		const tempx = (W/2) - x;
		const tempy = H - y;
		const hyp = Math.hypot(tempx, tempy);
		
		const dx = speed * tempx / hyp;
		const dy = speed * tempy / hyp;
		this.delta = new Point(-dx, -dy);
		
		this.hue = Math.random() * 360 | 0;
		this.sat = 100;
		this.alpha = 100;
		this.fragments = [];
	}

	Done() {
		return this.exploded && this.fragments.length === 0;
	}

	Draw() {
		if (this.exploded) {
			// Batch render fragments
			ctx.save();
			const r = 4;
			for (const frag of this.fragments) {
				for (let i = 0; i < 5; i++) {
					const alpha = 100 - (i * 7);
					ctx.fillStyle = getColor(frag.hue, 100, alpha);
					const point = frag.trail[i];
					ctx.fillRect(point.x, point.y, r, r);
				}
			}
			ctx.restore();
			return;
		}
		
		ctx.beginPath();
		ctx.strokeStyle = getColor(this.hue, this.sat, this.alpha);
		ctx.lineWidth = 4;
		ctx.moveTo(this.location.x, this.location.y);
		ctx.lineTo(
			this.location.x + this.delta.x * 2,
			this.location.y + this.delta.y * 2
		);
		ctx.stroke();
	}

	Move() {
		if (this.exploded) {
			for (let i = this.fragments.length - 1; i >= 0; i--) {
				const frag = this.fragments[i];
				
				// Update fragment position
				frag.location.x += frag.velocity.x;
				frag.location.y += frag.velocity.y;
				frag.velocity.x *= 0.95;
				frag.velocity.y *= 0.95;
				frag.velocity.y -= G;
				
				// Update trail using circular buffer
				frag.trail[frag.trailIndex].x = frag.location.x;
				frag.trail[frag.trailIndex].y = frag.location.y;
				frag.trailIndex = (frag.trailIndex + 1) % 5;
				
				frag.age--;
				if (frag.age < 0) {
					this.fragments.splice(i, 1);
				}
			}
			return;
		}

		this.location = this.location.plus(this.delta);
		if (this.location.y < this.target.y) {
			this.Explode();
		}
	}

	Explode() {
		this.exploded = true;
		const particles = Math.random() * 30 + 150 | 0;
		for (let i = 0; i < particles; i++) {
			this.fragments.push(
				getFragment(this.location.x, this.location.y, this.hue)
			);
		}
	}
}

function manageFireworks() {
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, W, H);
	
	if (!fw.length) {
		if (AF) {
			cancelAnimationFrame(AF);
			AF = 0;
		}
		wrapper.classList.remove('hide');
		ans.focus();
		return;
	}
	
	AF = requestAnimationFrame(manageFireworks);
	
	// Batch process fireworks
	for (let i = fw.length - 1; i >= 0; i--) {
		fw[i].Move();
		fw[i].Draw();
		if (fw[i].Done()) {
			fw.splice(i, 1);
		}
	}
	
	if (encourageTimer > 0) {
		encourage();
	}
}

function showEncourage(duration) {
	encouragementHue = Math.random() * 360 | 0;
	encourageTimer = duration;
}

function encourage() {
	encourageTimer--;
	if (encourageTimer < 3) {
		wrapper.classList.remove('hide');
		ans.focus();
	}
	
	const text = "LEVEL UP!";
	let px = W/6 | 0;
	let width = 0;
	
	if (encourageTimer % 25 === 0) {
		encouragementHue = Math.random() * 360 | 0;
	}
	
	ctx.fillStyle = getColor(encouragementHue, 50, 100);
	
	do {
		ctx.font = `${px}px sans-serif`;
		px -= 5;
		width = ctx.measureText(text).width;
	} while (width > W)
	
	ctx.fillText(text, (W-width)/2, H/2);
}

function launchFirework(count = 1) {
	if (fw.length > 25) return;
	for (let i = 0; i < count; i++) {
		fw.push(new Firework());
	}
	if (!AF) {
		AF = requestAnimationFrame(manageFireworks);
	}
}

function initFireworks() {
	const w = Math.max(document.documentElement.clientWidth) - 1;
	const h = Math.max(document.documentElement.clientHeight) - 1;
	
	F.style.width = w;
	F.style.height = h;
	F.width = w;
	F.height = h;
	
	H = h;
	W = w;
	
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, W, H);
}

// Initialize fireworks and handle window resizing
initFireworks();
window.addEventListener('resize', () => {
	// Debounce the resize event to prevent too many calls
	if (window.resizeTimeout) {
		clearTimeout(window.resizeTimeout);
	}
	window.resizeTimeout = setTimeout(() => {
		initFireworks();
	}, 250); // Wait for 250ms after last resize event
});