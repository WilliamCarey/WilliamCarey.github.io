/* This is a class that draws an animated unit circle on a canvas. It has a couple of event handlers. */

class ContinuousHyperbola {
	constructor(canvas, delegate)
	{
		this.delegate = delegate;
		
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.cx = this.canvas.width / 2;
		this.cy = this.canvas.height;

		this.slope = 2;
		this.height = 100;

		this.paused = false;

		/* Timing for animation */
		this.startTime = 0;
		this.lastTime = 0;
	}
	
	animate() {
		let time = (new Date()).getTime() - this.startTime;
	
		let dt = time - this.lastTime

		this.lastTime = time

		// redraw
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawHyperbola(this.context);
	
		/* Request a redraw on the next frame */
		requestAnimFrame(() => { this.animate(); });
	}
		
	drawHyperbola(context) {
		context.lineWidth = 1;
	
		// Draw the background axes
		context.beginPath();
		context.strokeStyle = '#aaa'; 
		context.moveTo(0,0);
		context.lineTo(400,0);

		context.moveTo(0,0);
		context.lineTo(0,400);

		context.stroke();
		
		// Draw the line of the hyperbola
		
		context.beginPath();
		context.strokeStyle = '#aaa';
		context.lineWidth = 3;
		context.moveTo(this.cx,this.cy);
		context.lineTo(2 * this.cx, this.cy - (this.cx * this.slope));		
		context.stroke();
		
		// Draw the rectangle whose are we are comparing to the square area
		// The height will be height, the width is computed from the height and the slope.
		
		var width = this.height / this.slope;
		
		context.beginPath();
		context.strokeStyle = '#999';
		context.lineWidth = 1;
		context.moveTo(this.cx + 0, this.cy - 0);
		context.lineTo(this.cx + width,this.cy - 0);
		context.lineTo(this.cx + width,this.cy - this.height);
		context.lineTo(this.cx + 0, this.cy - this.height);
		context.lineTo(this.cx + 0, this.cy - 0);
		
		context.stroke();
		
		// Draw the square whose area equals the area of the rectangle.
		// The sidelength is the square root of the are of the rectangle.
		
		var s = Math.sqrt(width * this.height);
				
		context.beginPath();
		context.strokeStyle = '#F00';
		context.lineWidth = 3;
		context.moveTo(this.cx + 0, this.cy - this.height);
		context.lineTo(this.cx - s,this.cy - this.height);
		context.lineTo(this.cx - s,this.cy - this.height + s);
		context.lineTo(this.cx + 0, this.cy - this.height + s);
		context.lineTo(this.cx + 0, this.cy - this.height);						
		context.stroke();
						
		// Draw the hyperbolic curve
			
		var y = 0;
		context.beginPath();
		context.strokeStyle = '#0F0';
		context.moveTo(this.cx, this.cy);
		
		while (y < this.height) {
			var x = y / this.slope;
			var s = Math.sqrt(x * y);
			context.lineTo(this.cx - s, this.cy - y);
			y++;
		}
		context.stroke();
	}

	startAnimation() {
		this.startTime = (new Date()).getTime();
		this.animate();
	}
	
	togglePaused() {
		this.paused = !this.paused;
		this.angularSpeed = this.paused ? 0 : 15;
	}

	pause() {
		this.paused = true;
		this.angularSpeed = 0;
	}

};