

class SineCurve {
	constructor(canvas, delegate)
	{
		this.delegate = delegate;
		
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.origin = { x: 50, y: 300 };
		this.yScale = 500;
		this.xScale = 500;
		
		this.angle = 0; /* Measured in degrees */
		this.angularSpeed = 30; /* Measured in degrees per second */

		this.paused = false;

		/* Timing for animation */
		this.startTime = 0;
		this.lastTime = 0;
	}
	
	animate() {
		let time = (new Date()).getTime() - this.startTime;
	
		let dt = time - this.lastTime

		this.lastTime = time

		// update
		this.angle += (this.angularSpeed * dt / 1000) % 360;

		// redraw
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawSineCurve(this.context);
	
		/* Request a redraw on the next frame */
		requestAnimFrame(() => { this.animate(); });
	}
	
	drawSineCurve(context) {
		context.lineWidth = 1;
		context.strokeStyle = '#aaa';
	
		// Draw the background axes
		context.beginPath();
		context.strokeStyle = '#999'; 
		context.moveTo(this.origin.x, this.origin.y - this.yScale / 2);
		context.lineTo(this.origin.x, this.origin.y + this.yScale / 2);

		context.moveTo(this.origin.x, this.origin.y);
		context.lineTo(this.origin.x + this.xScale, this.origin.y);

		context.stroke();

		// Draw the axis labels.
		context.font = context.font.replace(/\d+px/, "18px");
		context.fillText("(0,0)",5,this.origin.y);
		context.fillText("(0,1)",5,this.origin.y - this.yScale / 2);
		context.fillText("(0,-1)",5,this.origin.y + this.yScale / 2);

		// Draw the unhighlighed sine curve.
		context.beginPath();
		context.strokeStyle = '#999'; 
		context.moveTo(this.origin.x, this.origin.y);
		var x;
		for (x = 0; x <= 360; x++)
		{
			var dx = x / 360.0 * this.xScale;
			var theta = dx * Math.PI / 180.0;
			context.lineTo(dx + this.origin.x, this.origin.y - Math.sin(x* Math.PI / 180.0) * this.yScale / 2);
		}
		context.stroke();
		
		// Calculate the angular offset to draw the vertical highlight.
		var rx = (this.angle % 360) / 360.0 * this.xScale;
		
		context.beginPath();
		context.strokeStyle = '#F00';
		context.lineWidth = 5;
		context.moveTo(this.origin.x + rx, this.origin.y);
		context.lineTo(this.origin.x + rx, this.origin.y - Math.sin(this.angle * Math.PI / 180.0) * this.yScale / 2)
		context.stroke();

		context.beginPath();
		
		context.strokeStyle = '#00F';
		context.lineWidth = 5;
		context.moveTo(this.origin.x, this.origin.y);
		context.lineTo(this.origin.x + rx, this.origin.y);
		
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
	
}