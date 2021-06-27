/* This is a class that draws an animated unit circle on a canvas. It has a couple of event handlers. */

class ContinuousParabola {
	constructor(canvas, delegate)
	{
		this.delegate = delegate;
		
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.cx = this.canvas.width / 2;
		this.cy = this.canvas.height;

		this.height = 1;

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
		this.drawParabola(this.context);
	
		/* Request a redraw on the next frame */
		requestAnimFrame(() => { this.animate(); });
	}
		
	drawParabola(context) {
		context.lineWidth = 1;
	
		// Draw the background axes
		context.beginPath();
		context.strokeStyle = '#aaa'; 
		context.moveTo(0,0);
		context.lineTo(400,0);

		context.moveTo(0,0);
		context.lineTo(0,400);

		context.stroke();
		
		// Draw the rectangle whose are we are comparing
		
		context.beginPath();
		context.strokeStyle = '#999';
		context.moveTo(this.cx + 0, this.cy - 0);
		context.lineTo(this.cx + 40,this.cy - 0);
		context.lineTo(this.cx + 40,this.cy - this.height);
		context.lineTo(this.cx + 0, this.cy - this.height);
		context.lineTo(this.cx + 0, this.cy - 0);
		
		context.stroke();	
		
		// Draw the square whose area equals the area of the rectangle.
				
		var s = Math.sqrt(this.height * 40)
		context.beginPath();
		context.strokeStyle = '#F00';
		context.moveTo(this.cx + 0, this.cy - this.height);
		context.lineTo(this.cx - s,this.cy - this.height);
		context.lineTo(this.cx - s,this.cy - this.height + s);
		context.lineTo(this.cx + 0, this.cy - this.height + s);
		context.lineTo(this.cx + 0, this.cy - this.height);						
		context.stroke();
						
		// Draw the parabolic curve
			
		var y = 0;
		context.beginPath();
		context.strokeStyle = '#0F0';
		context.moveTo(this.cx, this.cy);
		
		while (y < this.height) {
			context.lineTo(this.cx - Math.sqrt(y * 40), this.cy - y);
			y++;			
		}
		context.stroke();

		/*
	
		// Draw the triangle
		var fdx = this.center.x + this.radius * Math.cos(this.frontAngle * Math.PI / 180.0);
		var fdy = this.center.y - this.radius * Math.sin(this.frontAngle * Math.PI / 180.0);

		var bdx = this.center.x + this.radius * Math.cos(this.backAngle * Math.PI / 180.0);
		var bdy = this.center.y - this.radius * Math.sin(this.backAngle * Math.PI / 180.0);

		this.apparentFrontAngle = Math.atan2(this.radius * Math.sin(this.frontAngle * Math.PI / 180.0) + this.deferent, this.radius * Math.cos(this.frontAngle * Math.PI / 180.0)) * 180.0 / Math.PI;
		
		this.apparentBackAngle = Math.atan2(this.radius * Math.sin(this.backAngle * Math.PI / 180.0) + this.deferent, this.radius * Math.cos(this.backAngle * Math.PI / 180.0)) * 180.0 / Math.PI;

		// Draw the observed position from the center of the orbit.
		context.beginPath();
		context.lineWidth = 2;
		context.strokeStyle = '#00F'; 
		context.fillStyle = '#999';
		
		context.moveTo(this.center.x, this.center.y);
		context.lineTo(fdx,fdy);

		context.moveTo(this.center.x, this.center.y);
		context.lineTo(bdx,bdy);
		context.closePath();
		context.stroke();

		context.beginPath();
		context.lineWidth = 5;
		context.arc(this.center.x, this.center.y, this.radius - this.deferent, 
			(360 - this.backAngle) * Math.PI / 180.0, (360 - this.frontAngle) * Math.PI / 180.0, true); 
		context.stroke();
		
		// Draw the observed position from the deferent.
		context.beginPath();
		context.lineWidth = 2;
		context.strokeStyle = '#0F0'; 
		context.fillStyle = '#999';
		
		context.moveTo(this.center.x, this.center.y + this.deferent);
		context.lineTo(fdx,fdy);

		context.moveTo(this.center.x, this.center.y + this.deferent);
		context.lineTo(bdx,bdy);

		context.closePath();
		context.stroke();

		context.beginPath();
		context.lineWidth = 5;
				
		context.arc(this.center.x, this.center.y + this.deferent, this.radius - this.deferent, (360 - this.apparentBackAngle) * Math.PI / 180.0, (360 - this.apparentFrontAngle) * Math.PI / 180.0, true); 
		context.stroke();
		
		// Draw the unit circle

		
		if (this.paused)
		{
			var displayAngle = Math.round(this.angle);
			
			context.font = context.font.replace(/\d+px/, "18px");
			context.fillStyle = "#333";
			var displayX = Math.trunc(Math.cos(displayAngle * Math.PI / 180.0) * 1000) / 1000;
			var displayY = Math.trunc(Math.sin(displayAngle * Math.PI / 180.0) * 1000) / 1000;
			
			context.fillText(`(${displayX},${displayY})`,dx+5,dy+5);

			context.fillText(`${displayAngle}\xB0`,this.center.x+30,this.center.y-30);

		}
		
		//		theta = "\u0398";
		*/
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