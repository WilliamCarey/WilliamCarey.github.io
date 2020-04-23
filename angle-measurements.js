// Drawing utilities

class DraggableVertex {
	constructor(canvas, x, y, freedom, updateNotifier) {

		this.ctx = canvas.getContext("2d");
		canvas.addEventListener("mousedown", this.startDrag.bind(this))
		canvas.addEventListener("mousemove", this.drag.bind(this))
		canvas.addEventListener("mouseup", this.stopDrag.bind(this))
		
		this.updateNotifier = updateNotifier
		
		this.fill = "#3333CC";
		
		this.x = x;
		this.y = y;
		this.freedom = freedom; // Stringly typed: HORIZONTAL|VERTICAL|FREE
		
		this.isDragging = false;
		
		// Stuff that doesn't change
		this.RADIUS = 12
	}

	draw() {
		this.ctx.fillStyle = this.fill;
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.RADIUS - 2, 0, 2 * Math.PI, false); 
		this.ctx.closePath();
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.strokeStyle = "#ccc";
		this.ctx.arc(this.x, this.y, this.RADIUS - 1, 0, 2 * Math.PI, false); 
		this.ctx.closePath();
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.strokeStyle = "#aaa";
		this.ctx.arc(this.x, this.y, this.RADIUS, 0, 2 * Math.PI, false); 
		this.ctx.closePath();
		this.ctx.stroke();
	}
	
	startDrag(e) {
		e.preventDefault();
		e.stopPropagation();
		
		var dx = e.offsetX - this.x
		var dy = e.offsetY - this.y
		
		if (Math.sqrt(dx * dx + dy * dy) <= this.RADIUS) {
			console.log("Hit!");
			this.isDragging = true;
			this.fill = "#6666CC";
			
			this.startX = this.x;
			this.startY = this.y;
		}
	}
	
	drag(e) {
		if (!this.isDragging) {
			return;
		}
		
        e.preventDefault();
        e.stopPropagation();

        var dx = e.offsetX - this.startX;
        var dy = e.offsetY - this.startY;

		if (this.freedom == "HORIZONTAL" || this.freedom == "FREE") {
			this.x += dx;
		}
        if (this.freedom == "VERTICAL" || this.freedom == "FREE") {
			this.y += dy;
        }
		
		if (this.freedom == "")

        // reset the starting mouse position for the next mousemove
        this.startX = e.offsetX;
        this.startY = e.offsetY;
		
		this.updateNotifier();
    }
	
	stopDrag(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.fill = "#3333CC";
		this.isDragging = false;
		this.updateNotifier();
	}
}