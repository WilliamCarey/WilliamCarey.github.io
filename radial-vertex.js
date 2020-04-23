// Drawing utilities

function RadialVertex(canvas, cx, cy, r, updateNotifier)
{
	this.ctx = canvas.getContext("2d");
	canvas.addEventListener("mousedown", this.startDrag.bind(this))
	canvas.addEventListener("mousemove", this.drag.bind(this))
	canvas.addEventListener("mouseup", this.stopDrag.bind(this))
	
	this.cx = cx;
	this.cy = cy;
	this.r = r;
	
	this.updateNotifier = updateNotifier
	
	this.fill = "#3333CC";
	
	this.x = cx + r;
	this.y = cy;
	
	this.isDragging = false;
	
	// Stuff that doesn't change
	this.RADIUS = 8
}

RadialVertex.prototype.draw = function()
{
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
	
RadialVertex.prototype.startDrag = function(e)
{
	e.preventDefault();
	e.stopPropagation();
	
	var dx = e.offsetX - this.x
	var dy = e.offsetY - this.y
	
	if (Math.sqrt(dx * dx + dy * dy) <= this.RADIUS) {
		this.isDragging = true;
		this.fill = "#6666CC";
		
		this.startX = this.x;
		this.startY = this.y;
	}
}
	
RadialVertex.prototype.drag = function(e)
{
	if (!this.isDragging) {
		return;
	}
	
    e.preventDefault();
    e.stopPropagation();

    var dx = e.offsetX - this.cy;
    var dy = e.offsetY - this.cx;

	var radAngle = Math.atan2(-dy, dx);
	if (radAngle < 0) {
		radAngle += Math.PI * 2;
	}

	this.x = this.cx + this.r * Math.cos(radAngle);
	this.y = this.cy - this.r * Math.sin(radAngle);

    // reset the starting mouse position for the next mousemove
    this.startX = this.x;
    this.startY = this.y;
	
	
	this.updateNotifier();
}
	
RadialVertex.prototype.stopDrag = function(e)
{
	e.preventDefault();
	e.stopPropagation();
	
	this.fill = "#3333CC";
	this.isDragging = false;
	this.updateNotifier();
}