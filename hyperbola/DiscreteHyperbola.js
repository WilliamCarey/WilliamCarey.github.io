class DiscreteHyperbola {
	constructor(canvas, delegate)
	{
		this.delegate = delegate;
		
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		// The slope of the line for the equiareal rectangles
		this.slope = 2;

		this.cx = this.canvas.width / 2;
		this.cy = this.canvas.height;

		this.numSquares = 1;

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
	
	isPerfectSquare(n) {
		if (n == 1 || n == 4 || n == 9 || n == 16)
		{
			return true;
		}
		return false;
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
		
		var i = 0;
		while (i < this.numSquares)
		{
			context.beginPath();
			context.strokeStyle = '#999';
			context.moveTo(this.cx + 0, this.cy - 40 * i);
			context.lineTo(this.cx + 40,this.cy - 40 * i);
			context.lineTo(this.cx + 40,this.cy - 40 * (i+1));
			context.lineTo(this.cx + 0, this.cy - 40 * (i+1));
			context.lineTo(this.cx + 0, this.cy - 40 * i);
			
			context.stroke();
			
			if (this.isPerfectSquare(i+1))
			{
				// Sodding upside down co-ordinates. Ugh.
				
				context.beginPath();
				context.strokeStyle = '#F00';
				context.moveTo(this.cx + 0, this.cy - (40 * (i+1 - Math.sqrt(i+1))));
				context.lineTo(this.cx - (40 * Math.sqrt(i+1)),this.cy - (40 * (i+1 - Math.sqrt(i+1))));
				context.lineTo(this.cx - (40 * Math.sqrt(i+1)),this.cy - 40 * (i+1));
				context.lineTo(this.cx + 0, this.cy - 40 * (i+1));
				context.lineTo(this.cx + 0, this.cy - (40 * (i + 1 - Math.sqrt(i+1))));				
				
				context.stroke();
			}
			
			i++;
			
			// Draw the parabolic curve
			
			var x = 0;
			context.beginPath();
			context.strokeStyle = '#0F0';
			context.moveTo(this.cx + x, this.cy);
			while (x < (Math.sqrt(this.numSquares)) * 40) {
				context.lineTo(this.cx - x, this.cy - (x * x / 40));
				x++;				
			}
			context.stroke();
		}
	
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